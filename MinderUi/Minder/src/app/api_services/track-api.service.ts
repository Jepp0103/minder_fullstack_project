import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackApiService {

  readonly APIUrl = "https://localhost:7151/api";
  constructor(private http:HttpClient) { }

  getTracks():Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/tracks');
  }

  addTrack(val:any) {
    return this.http.post(this.APIUrl + '/tracks', val);
  }

  updateTrack(val:any) {
    return this.http.put(this.APIUrl + '/tracks', val);
  }

  deleteTrack(val:any) {
    return this.http.delete(this.APIUrl + '/tracks', val);
  }
}
