import { Component } from '@angular/core';
import { AuthenticationApiService } from '../api-services/authentication-api.service';


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
