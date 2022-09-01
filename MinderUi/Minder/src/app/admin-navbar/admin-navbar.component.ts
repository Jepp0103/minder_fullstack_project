import { Component } from '@angular/core';


@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {

  constructor() {
  }

  logOut() {
    window.sessionStorage.clear();
    window.location.reload();
  }
}
