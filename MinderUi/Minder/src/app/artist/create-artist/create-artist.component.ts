import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.css']
})
export class CreateArtistComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() art: any;
  Name:any;
  modalStyle = 'artistModalNone';
  ActivateCreateArtistComponent:boolean=false;

  ngOnInit(): void {
    this.Name = this.art.Name;
  }

  closeClick() {
    this.modalStyle = 'artistModalNone';
    this.ActivateCreateArtistComponent = false;
  }

  addClick() {
    this.art= {
      Name: ""
    }
    this.ActivateCreateArtistComponent = true;

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
  }

  updateArtist() {
    var val = {
      Name: this.Name
    };
    this.service.updateArtist(val).subscribe(res => {
    alert(res.toString());
    });
  }
}
