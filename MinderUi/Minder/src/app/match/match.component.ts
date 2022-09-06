import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchApiService } from '../api-services/match-api.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  UserMatches:any=[];
  TrackMatches:any=[];
  Matches:any=[];

  constructor(private service:MatchApiService, router:Router) {
    if(!sessionStorage.getItem('SessionKeyEmail')) {
      router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.loadMatches();
  }

 loadMatches() {
   const userId = Number(sessionStorage.getItem("SessionId"));
   this.service.getUserMatches(userId).subscribe(data => {
    this.UserMatches = data;
    });

    this.service.getTrackMatches(userId).subscribe(data => {
        this.TrackMatches = data;
        this.Matches = this.UserMatches.concat(this.TrackMatches);
        this.Matches = this.sortByKey(this.Matches, 'CustomerId');
    })
  }

  sortByKey(array:[], key:string){
    return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
}
