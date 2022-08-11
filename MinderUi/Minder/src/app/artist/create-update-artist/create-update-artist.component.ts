import { Component, OnInit } from '@angular/core';
import { ArtistApiService } from 'src/app/api-services/artist-api.service';

@Component({
  selector: 'app-create-update-artist',
  templateUrl: './create-update-artist.component.html',
  styleUrls: ['./create-update-artist.component.css']
})

export class CreateUpdateArtistComponent implements OnInit {

  Name:string;
  ArtistId:number;
  modalStyle: string;
  modalActive = 'modal';
  modalNone = 'modalNone'
  public isEditing: boolean = false;
  public isCreating: boolean = false;

  constructor(private service:ArtistApiService) {
    this.modalStyle = this.modalNone;
    this.Name = "";
    this.ArtistId = 0;
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
    this.isCreating = true;

    //Toggle modal
    this.modalStyle = this.modalStyle == this.modalNone ? this.modalActive : this.modalNone;
  }

  addArtist() {
    var val = {
      Name: this.Name
    };
    this.service.addArtist(val).subscribe(data => {
      const name = Object.values(data)[0].Name;
      const artistId = Object.values(data)[0].ArtistId;
      alert("Artist created with the following information:\n"
       + "Name: " + name + ", Id: " + artistId);
      this.modalStyle = this.modalNone;
      this.Name = "";
      this.isCreating = false;
      window.location.reload();
    });

  }

  editClick(id:number) {
    this.isEditing = true;

    this.service.getArtistById(id).subscribe(data => {
      this.ArtistId = data[0].ArtistId;
      this.Name = data[0].Name;
    });

    //Toggle modal
    this.modalStyle = this.modalStyle == this.modalNone ? this.modalActive : this.modalNone;
  }

  editArtist() {
    var val = {
      Name: this.Name
    };
    this.service.updateArtist(this.ArtistId, val).subscribe(data => {
      const name = Object.values(data)[0].Name;
      const artistId = Object.values(data)[0].ArtistId;
      alert("Artist updated with the following information:\n"
       + "Name: " + name + ", Id: " + artistId);
       this.isEditing = false;
       this.modalStyle = this.modalNone;
       window.location.reload();
    });

  }
}
