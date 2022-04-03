import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyA1B-Qmh4AmSaO1g9pfWFJUot85qjvS0Z0",
      authDomain: "bookshelves-a0d4d.firebaseapp.com",
      projectId: "bookshelves-a0d4d",
      storageBucket: "bookshelves-a0d4d.appspot.com",
      messagingSenderId: "458251573043",
      appId: "1:458251573043:web:2f622cd8d95abfb3801046"
    };
    const app = initializeApp(firebaseConfig); 
  }
}
