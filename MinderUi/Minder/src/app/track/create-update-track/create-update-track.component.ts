import { Component, OnInit, Input } from '@angular/core';
import { TrackApiService } from 'src/app/api-services/track-api.service';

@Component({
  selector: 'app-create-update-track',
  templateUrl: './create-update-track.component.html',
  styleUrls: ['./create-update-track.component.css']
})
export class CreateUpdateTrackComponent implements OnInit {

  Name:string;
  AlbumId:string;
  TrackId:number;
  MediaTypeId:string;
  GenreId:string;
  Composer:string;
  Milliseconds:string;
  Bytes:string;
  UnitPrice:string;
  modalStyle:string;
  modalActive = 'modal';
  modalNone = 'modalNone'
  public isEditing: boolean = false;
  public isCreating: boolean = false;

  constructor(private service:TrackApiService) {
    this.TrackId = 0;
    this.Name = "";
    this.AlbumId = "";
    this.MediaTypeId = "";
    this.GenreId = "";
    this.Composer = "";
    this.Milliseconds = "";
    this.Bytes = "";
    this.UnitPrice = "";

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
    this.Name = "";
    this.AlbumId = "";
    this.MediaTypeId = "";
    this.GenreId = "";
    this.Composer = "";
    this.Milliseconds = "";
    this.Bytes = "";
    this.UnitPrice = "";
    this.isCreating = true;

    //Toggle modal
    this.modalStyle = this.modalStyle == this.modalNone ? this.modalActive : this.modalNone;
  }

  addTrack() {
    var content = {
      Name: this.Name,
      Composer: this.Composer,
      AlbumId: this.AlbumId,
      MediaTypeId: this.MediaTypeId,
      GenreId: this.GenreId,
      Milliseconds: this.Milliseconds,
      Bytes: this.Bytes,
      UnitPrice: this.UnitPrice
    };

    this.service.addTrack(content).subscribe(data => {
      this.alertResponse(data, "added");
    });
  }

  editClick(id:number) {
    this.isEditing = true;
    this.service.getTrackById(id).subscribe(data => {
      this.TrackId = data[0].TrackId;
      this.Name = data[0].Name;
      this.AlbumId = data[0].AlbumId;
      this.MediaTypeId = data[0].MediaTypeId;
      this.GenreId = data[0].GenreId;
      this.Composer = data[0].Composer;
      this.Milliseconds = data[0].Milliseconds;
      this.Bytes = data[0].Bytes;
      this.UnitPrice = data[0].UnitPrice;
    });

    //Toggle modal
    this.modalStyle = this.modalStyle == this.modalNone ? this.modalActive : this.modalNone;
  }

  editTrack() {
    var content = {
      Name: this.Name,
      Composer: this.Composer,
      AlbumId: this.AlbumId,
      MediaTypeId: this.MediaTypeId,
      GenreId: this.GenreId,
      Milliseconds: this.Milliseconds,
      Bytes: this.Bytes,
      UnitPrice: Number(this.UnitPrice)
    };
    this.service.updateTrack(this.TrackId, content).subscribe(data => {
        this.alertResponse(data, "updated");
    });
  }

  alertResponse(data:Object, command:String) {
    const name = Object.values(data)[0].Name;
    const albumId = Object.values(data)[0].AlbumId;
    const mediaTypeId = Object.values(data)[0].MediaTypeId;
    const genreId = Object.values(data)[0].GenreId;
    const composer = Object.values(data)[0].Composer;
    const milliseconds = Object.values(data)[0].Milliseconds;
    const bytes = Object.values(data)[0].Bytes;
    const unitPrice = Object.values(data)[0].UnitPrice;
    const trackId = Object.values(data)[0].TrackId;
    alert("Track " + command + " with the following information:\n"
     + "Name: " + name + ", Id: " + trackId + "\n"
     + "Album id: " + albumId + ", Media type id: " + mediaTypeId + "\n"
     + "Genre id: " + genreId + ", Composer: " + composer + "\n"
     + "Milliseconds: " + milliseconds + ", Bytes: " + bytes + "\n"
     + ", Unit price: " + unitPrice + "\n"
    );

     this.modalStyle = this.modalNone;
     this.isCreating = false;
     this.isEditing = false;
     window.location.reload();
  }
}
