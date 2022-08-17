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
  route:Router;
  notSignedIn:boolean;

  constructor(router:Router) {
    this.route = router;
    this.isAdmin = false;
    this.isUser = false;
    this.notSignedIn = true;
    this.checkAuthentication();
  }

  checkAuthentication(){
    if(sessionStorage.getItem('SessionKeyEmail')) {
      this.notSignedIn = false;
      this.isUser = true;
    } else if (sessionStorage.getItem('SessionAdmin')) {
      this.notSignedIn = false;
      this.isAdmin = true;
    }
  }
}
