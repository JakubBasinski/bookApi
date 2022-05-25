import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Book } from '../book-interfaces';
import {
  BOOKSMARKS_KEY,
  LocalStorageService,
} from '../../service/local-storage.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  @Input() totalItems: number = 0;

  @Input() books: Book[] = [];

  public bookmarks: string[] = [];

  constructor(private localStorage: LocalStorageService) {
    this.bookmarks = localStorage.getItem(BOOKSMARKS_KEY);
  }

  ngOnInit(): void {}

  addToBookmark(book: Book): void {
    if (this.bookmarks == null) {
      this.bookmarks = [];
    }
    this.bookmarks.push(book.id);
    this.localStorage.setItem(BOOKSMARKS_KEY, this.bookmarks);
  }

  isBookmarked(book: Book): boolean {
    if (this.bookmarks == null) {
      return false;
    }
    return this.bookmarks.includes(book.id);
  }

  removeFromBookmark(book: Book) {
    const index = this.bookmarks.indexOf(book.id);
    this.bookmarks.splice(index, 1);
    this.localStorage.setItem(BOOKSMARKS_KEY, this.bookmarks);
  }
}
