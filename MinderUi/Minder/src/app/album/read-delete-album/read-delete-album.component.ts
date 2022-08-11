import { Component, OnInit } from '@angular/core';
import { AlbumApiService } from 'src/app/api-services/album-api.service';

@Component({
  selector: 'app-read-delete-album',
  templateUrl: './read-delete-album.component.html',
  styleUrls: ['./read-delete-album.component.css']
})
export class ReadDeleteAlbumComponent implements OnInit {

  constructor(private service: AlbumApiService) { }

  Albums:any=[];
  ngOnInit(): void {
    this.loadAlbums();
  }

  loadAlbums() {
    this.service.getAlbums().subscribe(data  => {
      this.Albums = data;
    })
  }

  searchAlbums() {
    const searchObject = document.getElementById('searchAlbumsInput') as HTMLInputElement | null;
    const searchString = String(searchObject?.value);
    this.service.searchAlbums(searchString).subscribe(data => {
      this.Albums = data;
    })
  }

  deleteAlbum(id:number) {
    this.service.deleteAlbum(id).subscribe(data => {
      alert(data);
      window.location.reload();
    });
  }

}
