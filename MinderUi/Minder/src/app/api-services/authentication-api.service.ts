import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import MySettings  from '../../assets/MySettings.json';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService {

  readonly APIUrl = MySettings.baseUrl;
  constructor(private http:HttpClient) { }

  validateUser(content:any):Observable<any> {
    return this.http.post<any>(this.APIUrl + '/authentication/uservalidation', content)
  }

  validateAdmin(content:any):Observable<any> {
    return this.http.post<any>(this.APIUrl + '/authentication/adminvalidation', content)
  }

  getCustomerById(id:number):Observable<any> {
    return this.http.get<any>(this.APIUrl + '/customers/' + id);
  }

  addCustomer(content:any) {
    return this.http.post(this.APIUrl + '/customers', content);
  }

  updateCustomer(id:number, content:any) {
    return this.http.put(this.APIUrl + '/customers/' + id, content);
  }

  deleteCustomer(id:number) {
    return this.http.delete(this.APIUrl + '/customers/' + id);
  }
}
