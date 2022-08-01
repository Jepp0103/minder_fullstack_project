import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
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




  getArtists():Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/artists');
  }

  addArtist(val:any) {
    return this.http.post(this.APIUrl + '/artists', val);
  }

  updateArtist(val:any) {
    return this.http.put(this.APIUrl + '/artists', val);
  }

  deleteArtist(val:any) {
    return this.http.delete(this.APIUrl + '/artists', val);
  }


}
