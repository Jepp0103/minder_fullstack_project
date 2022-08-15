import { Component, OnInit } from '@angular/core';
import { AuthenticationApiService } from '../api-services/authentication-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent  {

  Password:string;
  router:Router;

  constructor(private service: AuthenticationApiService, route:Router) {
    this.Password = "";
    this.router = route;
  }

  loginAdmin() {
    const content = {
      Password: this.Password
    }

    this.service.validateAdmin(content).subscribe(data => {
      if(data === true) {
        sessionStorage.setItem('SessionAdmin', "true");
        this.router.navigate(['']);
      } else {
        alert("User does not exist.");
      }
    })
  }

}
