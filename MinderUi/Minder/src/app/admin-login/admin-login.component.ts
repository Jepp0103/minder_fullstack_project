import { Component, OnInit } from '@angular/core';
import { AuthenticationApiService } from '../api-services/authentication-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent  {

  Username:string;
  Password:string;
  router:Router;

  constructor(private service: AuthenticationApiService, route:Router) {
    this.Username = "";
    this.Password = "";
    this.router = route;
    this.checkSignIn();
  }

  checkSignIn() {
    if (sessionStorage.getItem('SessionAdmin')) {
      this.router.navigate(['']);
    }
  }

  loginAdmin() {
    const content = {
      Username: this.Username,
      Password: this.Password
    }

    this.service.validateAdmin(content).subscribe(data => {
      if(data === true) {
        sessionStorage.setItem('SessionAdmin', "true");
        window.location.reload();
      } else {

        alert("User does not exist.");
      }
    });
  }

}
