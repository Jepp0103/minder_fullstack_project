import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Minder';
  isAdmin:boolean;
  isUser:boolean;
  route:Router;
  notSignedIn:boolean;
  onCarousel:boolean;

  constructor(router:Router) {
    this.route = router;
    this.isAdmin = false;
    this.isUser = false;
    this.notSignedIn = true;
    this.onCarousel = false;
  }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(){
    this.route.events.subscribe((val) => { //Route subscripe makes it possible to
      //change state of variables without reloading page.
    if (sessionStorage.getItem('SessionKeyEmail')) {
      this.notSignedIn = false;
      this.isUser = true;
      this.onCarousel = this.route.url === '/' ? true : false; //If url is "/" then carousel is enabled.
    } else if (sessionStorage.getItem('SessionAdmin')) {
      this.notSignedIn = false;
      this.isAdmin = true;
    }
  });
  }
}
