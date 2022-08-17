import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent   {

  constructor(router:Router) {
    if(!sessionStorage.getItem('SessionAdmin')) {
      router.navigate(['/login']);
    }
  }
}
