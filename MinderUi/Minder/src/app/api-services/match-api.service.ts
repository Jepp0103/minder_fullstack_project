import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import MySettings  from '../../assets/MySettings.json';

@Injectable({
  providedIn: 'root'
})
export class MatchApiService {
  readonly APIUrl = MySettings.baseUrl;
  constructor(private http:HttpClient) { }

  getUserMatches(customerId:number):Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/customers/matches/' + customerId);
  }

  getTrackMatches(customerId:number):Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/customers/matches/tracks/' + customerId);
  }
}
