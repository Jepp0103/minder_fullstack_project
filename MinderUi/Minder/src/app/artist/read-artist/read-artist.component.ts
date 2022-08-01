import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-read-artist',
  templateUrl: './read-artist.component.html',
  styleUrls: ['./read-artist.component.css']
})

export class ReadArtistComponent implements OnInit {

  constructor(private service:SharedService) { }

  Artists:any=[];
  ActivateCreateUpdateArtistComponent:boolean=false;
  art: any;
  modalStyle = 'artistModalNone';

  ngOnInit(): void {
    this.loadArtists();
  }

  addClick() {
    this.art= {
      Name: ""
    }
    this.ActivateCreateUpdateArtistComponent = true;

    //Toggle modal
    this.modalStyle = this.modalStyle == 'artistModalNone' ? 'artistModal' : 'artistModalNone';
  }

  closeClick() {
    this.modalStyle = 'artistModalNone';
    this.ActivateCreateUpdateArtistComponent = false;
    this.loadArtists();
  }

  loadArtists(){
    this.service.getArtists().subscribe(data=> {
      this.Artists = data;
    })
  }
}
