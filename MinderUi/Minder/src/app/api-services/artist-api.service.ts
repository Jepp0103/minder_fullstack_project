import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import MySettings  from '../../assets/MySettings.json';

@Injectable({
  providedIn: 'root'
})
export class ArtistApiService {

  readonly APIUrl = MySettings.baseUrl;
  constructor(private http:HttpClient) { }

  getArtists():Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/artists');
  }

  getArtistById(id:number):Observable<any> {
    return this.http.get<any>(this.APIUrl + '/artists/' + id);
  }

  searchArtists(searchString:string):Observable<any> {
    return this.http.get<any>(this.APIUrl + '/artists/search?searchString=' + searchString);
  }

  addArtist(body:any) {
    return this.http.post(this.APIUrl + '/artists', body);
  }

  updateArtist(id:number, body:any) {
    return this.http.put(this.APIUrl + '/artists/' + id, body);
  }

  deleteArtist(id:number) {
    return this.http.delete(this.APIUrl + '/artists/' + id);
  }
}
