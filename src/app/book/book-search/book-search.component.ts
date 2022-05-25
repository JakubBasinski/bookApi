import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';
import { Book } from '../book-interfaces';
import { BookApiService } from '../service/book-api.service';
import { __classPrivateFieldGet } from 'tslib';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BookSearchComponent {
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport | undefined;

  private query = {
    title: '',
    lang: 'en',
  };

  private page = 0;
  private limit = 15;

  public form: FormGroup;
  public books: Book[] = [];

  loading = false;
  noMoreItems = false;
  totalItems: number = 0;

  constructor(
    formBuilder: FormBuilder,
    private api: BookApiService,
    private ngZone: NgZone
  ) {
    this.form = formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      lang: ['en', [Validators.required]],
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.query = this.form.value;
      this.page = 1;
      this.fetchData();
    }
  }

  ngAfterViewInit() {
    this.scroller
      ?.elementScrolled()
      .pipe(
        map(() => this.scroller?.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2! < y1! && y2! < 140),
        throttleTime(200)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.page = this.page + this.limit;
          this.fetchData();
        });

        this.scroller?.scrollTo({ bottom: 200 });
      });
  }

  private fetchData() {
    this.api
      .searchBooks(this.query.title, this.query.lang, this.page, this.limit)
      .subscribe({
        next: (result) => {
          if (result.totalItems == 0) {
            this.noMoreItems = true;
          } else {
            this.noMoreItems = false;
            this.loading = true;
            timer(2000).subscribe(() => {
              this.loading = false;
              this.books = result.items;
            });
          }
        },

        error: (error) => {
          alert('failed to fetch response from Google Books API');
          console.log(error);
        },
      });
  }
}
