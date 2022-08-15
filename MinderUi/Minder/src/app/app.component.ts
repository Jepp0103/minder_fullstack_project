import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Minder';
  isAdmin:boolean;
  isUser:boolean;

  constructor() {
    this.isAdmin = false;
    this.isUser = false;
    this.checkAuthentication();
  }

  checkAuthentication(){
    if(sessionStorage.getItem('SessionKeyEmail')) {
      this.isUser = true;
    } else if (sessionStorage.getItem('SessionAdmin')) {
      this.isAdmin = true;
    }
  }

}
