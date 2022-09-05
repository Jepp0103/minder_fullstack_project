import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchApiService {
  readonly APIUrl = "https://localhost:7151/api";
  constructor(private http:HttpClient) { }

  getMatches(customerId:number):Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/customers/matches/' + customerId);
  }
}
