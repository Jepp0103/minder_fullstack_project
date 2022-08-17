import { Component, OnInit } from '@angular/core';
declare var TrackCarousel: any;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let board = document.querySelector('#board');
    new TrackCarousel(board);
  }
}
