import { Component, OnInit, Input } from '@angular/core';
import { TrackApiService } from 'src/app/api_services/track-api.service';

@Component({
  selector: 'app-create-update-track',
  templateUrl: './create-update-track.component.html',
  styleUrls: ['./create-update-track.component.css']
})
export class CreateUpdateTrackComponent implements OnInit {
  constructor(private service:TrackApiService) {
    this.TrackId = 0;
    this.Name = "";
    this.AlbumId = 0;
    this.MediaTypeId = 0;
    this.GenreId = 0;
    this.Composer = "";
    this.Milliseconds = 0;
    this.Bytes = 0;
    this.UnitPrice = 0;

    this.modalStyle = this.modalNone;
  }

  Name:string;
  AlbumId:number;
  TrackId:number;
  MediaTypeId:number;
  GenreId:number;
  Composer:string;
  Milliseconds:number;
  Bytes:number;
  UnitPrice:number;
  modalStyle:string;
  modalActive = 'modal';
  modalNone = 'modalNone'
  public isEditing: boolean = false;
  public isCreating: boolean = false;

  ngOnInit(): void {
  }

  closeClick() {
    this.modalStyle = this.modalNone;
    this.isCreating = false;
    this.isEditing = false;
  }

  addClick() {
    this.Name = "";
    this.isCreating = true;

    //Toggle modal
    this.modalStyle = this.modalStyle == this.modalNone ? this.modalActive : this.modalNone;
  }

  addTrack() {
    var val = {
      Name: this.Name,
      AlbumId: this.AlbumId,
      MediaTypeId: this.MediaTypeId,
      GenreId: this.GenreId,
      Composer: this.Composer,
      Milliseconds: this.Milliseconds,
      Bytes: this.Bytes,
      UnitPrice: this.UnitPrice
    };
    this.service.addTrack(val).subscribe(data => {
      const name = Object.values(data)[0].Name;
      const trackId = Object.values(data)[0].ArtistId;
      alert("Track created with the following information:\n"
       + "Name: " + name + ", Id: " + trackId);
    });
    this.modalStyle = this.modalNone;
    this.Name = "";
    this.isCreating = false;
    window.location.reload();
  }

  editClick(id:number) {
    console.log("idddd:", id);
    this.isEditing = true;
    this.service.getTrackById(id).subscribe(data => {
      console.log("edit click name", data);
      this.Name = data[0].Name;
    });

    //Toggle modal
    this.modalStyle = this.modalStyle == this.modalNone ? this.modalActive : this.modalNone;
  }

  editTrack() {
    var val = {
      Name: this.Name
    };

    this.service.updateTrack(this.TrackId, val).subscribe(data => {
      const name = Object.values(data)[0].Name;
      const trackId = Object.values(data)[0].TrackId;
      alert("Track updated with the following information:\n"
       + "Name: " + name + ", Id: " + trackId);
    });
    this.isEditing = false;
    this.modalStyle = this.modalNone;
    window.location.reload();
  }

}
