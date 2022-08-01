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

  ngOnInit(): void {
    this.Name = this.art.Name;
  }

  addArtist() {
    var val = {
      Name: this.Name
    };
    console.log("valllll:", val);
    this.service.addArtist(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateArtist() {
    var val = {
      Name: this.Name
    };
    this.service.addArtist(val).subscribe(res => {
    alert(res.toString());
    });
  }
}
