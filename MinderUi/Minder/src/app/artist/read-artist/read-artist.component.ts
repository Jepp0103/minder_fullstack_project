import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-read-artist',
  templateUrl: './read-artist.component.html',
  styleUrls: ['./read-artist.component.css']
})

export class ReadArtistComponent implements OnInit {

  constructor(private service:SharedService) { }

  Artists:any=[];
  art: any;

  ngOnInit(): void {
    this.loadArtists();
  }

  loadArtists(){
    this.service.getArtists().subscribe(data=> {
      this.Artists = data;
    })
  }
}
