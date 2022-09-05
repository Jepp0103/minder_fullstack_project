import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchApiService } from '../api-services/match-api.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

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
   this.service.getMatches(userId).subscribe(data => {
     this.Matches = data;
     console.log(this.Matches);
   })
  }

}
