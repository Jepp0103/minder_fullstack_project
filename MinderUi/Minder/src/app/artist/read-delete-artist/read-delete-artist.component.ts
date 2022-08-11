import { Component, OnInit } from '@angular/core';
import { ArtistApiService } from 'src/app/api-services/artist-api.service';

@Component({
  selector: 'app-read-delete-artist',
  templateUrl: './read-delete-artist.component.html',
  styleUrls: ['./read-delete-artist.component.css']
})

export class ReadDeleteArtistComponent implements OnInit {

  constructor(private service:ArtistApiService) { }

  Artists:any=[];
  ngOnInit(): void {
    this.loadArtists();
  }

  loadArtists(){
    this.service.getArtists().subscribe(data => {
      this.Artists = data;
    })
  }

  searchArtists() {
    const searchObject = document.getElementById('searchArtistsInput') as HTMLInputElement | null;
    const searchString = String(searchObject?.value);
    this.service.searchArtists(searchString).subscribe(data => {
      this.Artists = data;
    })
  }

  deleteArtist(id:number) {
    this.service.deleteArtist(id).subscribe(data => {
      alert(data);
      window.location.reload();
    });
  }
}
