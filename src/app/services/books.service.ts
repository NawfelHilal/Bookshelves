import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { Book } from '../models/Book.model';
//import * as firebase from '@firebase/database';
//import { getDatabase, ref, set } from "firebase/database";
import firebase from 'firebase/compat/app';
//import 'firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  bookSubject = new Subject<Book[]>();

  constructor() { }

  emitbooks() {
    this.bookSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
    /*const db = getDatabase();
     set(ref(db, 'books/'), this.books);*/
  }

  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitbooks()
      });
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitbooks();
  }

  removeBook(book: Book){
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        of(bookEl === book) 
          return true;
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitbooks();
  }

}
