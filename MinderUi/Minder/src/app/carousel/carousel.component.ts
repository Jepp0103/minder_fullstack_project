import { Component, OnInit } from '@angular/core';
import { TrackApiService } from 'src/app/api-services/track-api.service';

declare var TrackCarousel: any;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  Tracks:any=[];

  constructor(private trackService:TrackApiService) {
  }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('SessionId');
    this.trackService.getTracks().subscribe(data => {
      this.Tracks = data;
      let board = document.querySelector('#board');
      new TrackCarousel(board, this.Tracks, userId);
    });

  }
}
