import { Component, OnInit } from '@angular/core';
import { TrackApiService } from 'src/app/api-services/track-api.service';

@Component({
  selector: 'app-read-delete-track',
  templateUrl: './read-delete-track.component.html',
  styleUrls: ['./read-delete-track.component.css']
})
export class ReadDeleteTrackComponent implements OnInit {

  constructor(private service:TrackApiService) { }

  Tracks:any=[];
  ngOnInit(): void {
    this.loadTracks();
  }

  loadTracks() {
    this.service.getTracks().subscribe(data  => {
      this.Tracks = data;
    })
  }

  searchTracks() {
    const searchObject = document.getElementById('searchTracksInput') as HTMLInputElement | null;
    const searchString = String(searchObject?.value);
    this.service.searchTracks(searchString).subscribe(data => {
      this.Tracks = data;
    })
  }

  deleteTrack(id:number) {
    this.service.deleteTrack(id).subscribe(data => {
      alert(data);
      window.location.reload();
    });
  }
}
