import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  EnableMessageMatch:boolean;
  MessageSubject:Subject<boolean>;

  constructor() {
    this.EnableMessageMatch = false;
    this.MessageSubject = new Subject();
  }

  get enableMessateMatch(): Subject<boolean> {
    return this.MessageSubject;
  }

  changeMessageState(MessageBool: boolean) {
    this.MessageSubject.next(MessageBool);
  }
}
