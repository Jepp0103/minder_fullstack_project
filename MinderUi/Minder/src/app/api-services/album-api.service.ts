import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumApiService {
  readonly APIUrl = "https://localhost:7151/api";
  constructor(private http:HttpClient) { }

  getAlbums():Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/albums');
  }

  getAlbumById(id:number):Observable<any> {
    return this.http.get<any>(this.APIUrl + '/albums/' + id);
  }

  searchAlbums(searchString:string):Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/albums/search/?searchString=' + searchString);
  }

  addAlbum(val:any) {
    return this.http.post(this.APIUrl + '/albums', val);
  }

  updateAlbum(id:number, body:any) {
    return this.http.put(this.APIUrl + '/albums/' + id, body);
  }

  deleteAlbum(id:number) {
    return this.http.delete(this.APIUrl + '/albums/' + id);
  }
}
