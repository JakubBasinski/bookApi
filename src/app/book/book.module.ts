import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookApiService } from './service/book-api.service';
import { BookSearchComponent } from './book-search/book-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { BookListComponent } from './book-list/book-list.component';
import { MatListModule } from '@angular/material/list';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CutTextPipe } from './pipes/cutText.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [BookSearchComponent, BookListComponent, CutTextPipe],

  imports: [
    CommonModule,
    BookRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    InfiniteScrollModule,
    MatListModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
  ],
  providers: [BookApiService],
})
export class BookModule {}
