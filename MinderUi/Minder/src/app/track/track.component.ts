import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent   {

  constructor(router:Router) {
    if(!sessionStorage.getItem('SessionAdmin')) {
      router.navigate(['/login']);
    }
  }

}
