import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liked-tracks',
  templateUrl: './liked-tracks.component.html',
  styleUrls: ['./liked-tracks.component.css']
})
export class LikedTracksComponent {

  constructor(router:Router) {
    if(!sessionStorage.getItem('SessionKeyEmail')) {
      router.navigate(['/login']);
    }
   }


}
