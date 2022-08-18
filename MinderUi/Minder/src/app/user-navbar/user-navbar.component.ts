import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})

export class UserNavbarComponent implements OnInit {
  SessionName:string;

  constructor() {
    this.SessionName = String(sessionStorage.getItem('SessionKeyEmail'));
  }

  ngOnInit(): void {
  }

  logOut() {
    window.sessionStorage.clear();
    window.location.reload();
  }

}
