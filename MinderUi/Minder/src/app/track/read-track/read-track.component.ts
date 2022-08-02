import { Component, OnInit } from '@angular/core';
import { TrackApiService } from 'src/app/api_services/track-api.service';

@Component({
  selector: 'app-read-track',
  templateUrl: './read-track.component.html',
  styleUrls: ['./read-track.component.css']
})
export class ReadTrackComponent implements OnInit {

  constructor(private service:TrackApiService) { }

  Tracks:any=[];

  ngOnInit(): void {
    this.service.getTracks().subscribe(data => {
      this.Tracks = data;
    })
  }

}
