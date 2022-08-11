import { Component, OnInit } from '@angular/core';
import { AlbumApiService } from 'src/app/api-services/album-api.service';

@Component({
  selector: 'app-create-update-album',
  templateUrl: './create-update-album.component.html',
  styleUrls: ['./create-update-album.component.css']
})
export class CreateUpdateAlbumComponent implements OnInit {

  Title:string;
  AlbumId:number;
  ArtistId:string;
  modalStyle:string;
  modalActive = 'modal';
  modalNone = 'modalNone'
  public isEditing: boolean = false;
  public isCreating: boolean = false;

  constructor(private service:AlbumApiService) {
    this.AlbumId = 0;
    this.Title = "";
    this.ArtistId = "";
    this.modalStyle = this.modalNone;
  }

  ngOnInit(): void {
  }

  closeClick() {
    this.modalStyle = this.modalNone;
    this.isCreating = false;
    this.isEditing = false;
  }

  addClick() {
    this.Title = "";
    this.ArtistId = "";
    this.isCreating = true;

    //Toggle modal
    this.modalStyle = this.modalStyle == this.modalNone ? this.modalActive : this.modalNone;
  }

  addAlbum() {
    var content = {
      Title: this.Title,
      ArtistId: this.ArtistId,
    };
    this.service.addAlbum(content).subscribe(data => {
      this.alertResponse(data, "added");
    });
  }

  editClick(id:number) {
    this.isEditing = true;
    this.service.getAlbumById(id).subscribe(data => {
      this.AlbumId = data[0].AlbumId;
      this.Title = data[0].Title;
      this.ArtistId = data[0].ArtistId;
    });

    //Toggle modal
    this.modalStyle = this.modalStyle == this.modalNone ? this.modalActive : this.modalNone;
  }

  editAlbum() {
    var content = {
      Title: this.Title,
      ArtistId: this.ArtistId,
    };
    this.service.updateAlbum(this.AlbumId, content).subscribe(data => {
        this.alertResponse(data, "updated");
    });
  }

  alertResponse(data:Object, command:String) {
    const title = Object.values(data)[0].Title;
    const albumId = Object.values(data)[0].AlbumId;
    const artistId = Object.values(data)[0].ArtistId;
    alert("Album " + command + " with the following information:\n"
     + "Name: " + title + ", Id: " + albumId + "\n"
     + "Artist id: " + artistId
    );

     this.modalStyle = this.modalNone;
     this.isCreating = false;
     this.isEditing = false;
     window.location.reload();
  }

}
