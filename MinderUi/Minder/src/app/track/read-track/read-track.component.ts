import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-read-track',
  templateUrl: './read-track.component.html',
  styleUrls: ['./read-track.component.css']
})
export class ReadTrackComponent implements OnInit {

  constructor(private service:SharedService) { }

  Tracks:any=[];

  ngOnInit(): void {
    this.service.getTracks().subscribe(data => {
      this.Tracks = data;
    })
  }

}
