import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  EnableMessageMatch:boolean;
  MatchId:string;
  MessageSubject:Subject<boolean>;
  MatchIdSubject:Subject<string>;

  constructor() {
    this.EnableMessageMatch = false;
    this.MessageSubject = new Subject();
    this.MatchId = "";
  }

  get enableMessateMatch(): Subject<boolean> {
    return this.MessageSubject;
  }

  get matchId() {
    return this.MatchId;
  }

  changeMessageState(messageBool: boolean) {
    this.MessageSubject.next(messageBool);
  }

  changeMatchIdState(matchId: string) {
    this.MatchId = matchId;
  }
}
