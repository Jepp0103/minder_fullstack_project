import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationApiService } from '../api-services/authentication-api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent  {

  UserId:number;
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

  constructor(private service:AuthenticationApiService, router:Router) {
    if(!sessionStorage.getItem('SessionKeyEmail')) {
      router.navigate(['/login']);
    }

    this.UserId = Number(sessionStorage.getItem("SessionId"));
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

    this.loadUserData();
  }

  loadUserData() {
    this.service.getCustomerById(this.UserId).subscribe(data => {
      this.FirstName = data[0].FirstName;
      this.LastName = data[0].LastName;
      this.Company = data[0].Company;
      this.Address = data[0].Address;
      this.City = data[0].City;
      this.State = data[0].State;
      this.Country = data[0].Country;
      this.Phone = data[0].Phone;
      this.PostalCode = data[0].PostalCode;
      this.Fax = data[0].Fax;
      this.Email = data[0].Email;
    });
  }

  updateCustomer() {
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

    this.service.updateCustomer(this.UserId, content).subscribe(data => {
      this.alertResponse(data);
    });
  }

  deleteCustomer() {
    if(confirm("Are you sure you want to delete the user?")) {
      this.service.deleteCustomer(this.UserId).subscribe(data => {
        window.sessionStorage.clear();
        this.alertResponse(data);
        window.location.reload();
      });
    }
  }

  alertResponse(data:string|Object) {
    if (data instanceof Object) {
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

      alert("Customer updated with the following information:\n"
        + "First name: " + FirstName + ", Id: " + sessionStorage.getItem("SessionId") + "\n"
        + "Last name: " + LastName + ", Password: " + Password + "\n"
        + "Company: " + Company + ", Address: " + Address + "\n"
        + "City: " + City + ", State: " + State + "\n"
        + ", Country: " + Country + "\n"
        + "Postal code: " + PostalCode + ", Phone: " + Phone + "\n"
        + "Fax: " + Fax + ", Email: " + Email + "\n"
     );
    } else {
      alert(data);
    }

     window.location.reload();
  }
}
