import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import MySettings  from '../../assets/MySettings.json';


@Injectable({
  providedIn: 'root'
})
export class TrackApiService {

  readonly APIUrl = MySettings.baseUrl;
  constructor(private http:HttpClient) { }

  getTracks():Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/tracks');
  }

  getLikedTracksById(id:number):Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/tracks/likes/' + id)
  }

  getTrackById(id:number):Observable<any> {
    return this.http.get<any>(this.APIUrl + '/tracks/' + id);
  }

  searchTracks(searchString:string):Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/tracks/search/?searchString=' + searchString);
  }

  addTrack(val:any) {
    return this.http.post(this.APIUrl + '/tracks', val);
  }

  updateTrack(id:number, body:any) {
    return this.http.put(this.APIUrl + '/tracks/' + id, body);
  }

  deleteTrack(id:number) {
    return this.http.delete(this.APIUrl + '/tracks/' + id);
  }

  deleteLike(id:number) {
    return this.http.delete(this.APIUrl + '/likes/' + id);
  }
}
