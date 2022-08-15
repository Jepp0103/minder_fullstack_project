import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent  {

  constructor(router:Router) {
    if(!sessionStorage.getItem('SessionKeyEmail')) {
      router.navigate(['/login']);
    }
  }
}
