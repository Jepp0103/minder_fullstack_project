import { Component } from '@angular/core';
import { AuthenticationApiService } from '../api-services/authentication-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  FirstName:string;
  LastName:string;
  Password:string;
  Company:string;
  Address:string;
  City:string;
  State:string;
  Country:string;
  PostalCode:string;
  Phone:string;
  Fax:string;
  Email:string;
  router:Router;


  constructor(private service:AuthenticationApiService, route:Router) {
    this.router = route;
    this.FirstName = "";
    this.LastName = "";
    this.Password = "";
    this.Company = "";
    this.Address = "";
    this.City = "";
    this.State = "";
    this.Country = "";
    this.PostalCode = "";
    this.Phone = "";
    this.Fax = "";
    this.Email = "";
  }

  addCustomer() {
    const content = {
      FirstName: this.FirstName,
      LastName: this.LastName,
      Password: this.Password,
      Company: this.Company,
      Address: this.Address,
      City: this.City,
      State: this.State,
      Country: this.Country,
      PostalCode: this.PostalCode,
      Phone: this.Phone,
      Fax: this.Fax,
      Email: this.Email
    };

    this.service.addCustomer(content).subscribe(data => {
      this.alertResponse(data, "added");
    });
  }

  alertResponse(data:Object, command:String) {
    const CustomerId = Object.values(data)[0].CustomerId;
    const FirstName = Object.values(data)[0].FirstName;
    const LastName = Object.values(data)[0].LastName;
    const Password = Object.values(data)[0].Password;
    const Company = Object.values(data)[0].Company;
    const Address = Object.values(data)[0].Address;
    const City = Object.values(data)[0].City;
    const State = Object.values(data)[0].State;
    const Country = Object.values(data)[0].Country;
    const PostalCode = Object.values(data)[0].PostalCode;
    const Phone = Object.values(data)[0].Phone;
    const Fax = Object.values(data)[0].Fax;
    const Email = Object.values(data)[0].Email;

    alert("Customer " + command + " with the following information:\n"
     + "First name: " + FirstName + ", Id: " + CustomerId + "\n"
     + "Last name: " + LastName + ", Password: " + Password + "\n"
     + "Company: " + Company + ", Address: " + Address + "\n"
     + "City: " + City + ", State: " + State + "\n"
     + ", Country: " + Country + "\n"
     + "Postal code: " + PostalCode + ", Phone: " + Phone + "\n"
     + "Fax: " + Fax + ", Email: " + Email + "\n"
    );

    this.router.navigate(['/login']);
  }
}
