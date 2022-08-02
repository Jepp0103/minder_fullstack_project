import { Component, OnInit, Input } from '@angular/core';
import { ArtistApiService } from 'src/app/api_services/artist-api.service';

@Component({
  selector: 'app-create-update-artist',
  templateUrl: './create-update-artist.component.html',
  styleUrls: ['./create-update-artist.component.css']
})

export class CreateUpdateArtistComponent implements OnInit {

  constructor(private service:ArtistApiService) { }

  Name:any;
  ArtistId:any;
  modalStyle = 'artistModalNone';
  public isEditing: boolean = false;
  public isCreating: boolean = false;

  ngOnInit(): void {
  }

  closeClick() {
    this.modalStyle = 'artistModalNone';
    this.isCreating = false;
    this.isEditing = false;
  }

  addClick() {
    this.Name = "";
    this.isCreating = true;

    //Toggle modal
    this.modalStyle = this.modalStyle == 'artistModalNone' ? 'artistModal' : 'artistModalNone';
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
    });
    this.modalStyle = 'artistModalNone';
    this.Name = "";
    this.isCreating = false;
    window.location.reload();
  }

  editClick(id:number) {
    this.ArtistId = id;
    this.isEditing = true;

    this.service.getArtistById(id).subscribe(data => {
      this.Name = data[0].Name;
    });

    //Toggle modal
    this.modalStyle = this.modalStyle == 'artistModalNone' ? 'artistModal' : 'artistModalNone';
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
    });
    this.isEditing = false;
    this.modalStyle = 'artistModalNone';
    window.location.reload();
  }
}
