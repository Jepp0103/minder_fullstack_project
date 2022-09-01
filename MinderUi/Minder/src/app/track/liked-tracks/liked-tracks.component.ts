import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TrackApiService } from 'src/app/api-services/track-api.service';
@Component({
  selector: 'app-liked-tracks',
  templateUrl: './liked-tracks.component.html',
  styleUrls: ['./liked-tracks.component.css']
})
export class LikedTracksComponent implements OnInit {

  LikedTracks:any=[];

  constructor(private service:TrackApiService, router:Router) {
    if(!sessionStorage.getItem('SessionKeyEmail')) {
      router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
     this.loadLikedTracks();
   }

  loadLikedTracks() {
    const userId = Number(sessionStorage.getItem("SessionId"));
    this.service.getLikedTracksById(userId).subscribe(data => {
      this.LikedTracks = data;
    })
   }

  deleteLike(likeId:number) {
    this.service.deleteLike(likeId).subscribe(data => {
      alert(data);
      window.location.reload();
    });
  }
}
