import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../../api-services/signalr.service';
import { SharedService } from 'src/app/api-services/shared.service';
import { MatchComponent } from '../match.component';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  MessageInput:string;
  CurrentUsername:string;
  CurrentUserId:number;
  Messages:any=[];
  MatchId:number;

  constructor(public signalrService: SignalrService, private sharedService:SharedService) {
    this.CurrentUsername = String(sessionStorage.getItem('SessionKeyEmail'));
    this.CurrentUserId = Number(sessionStorage.getItem('SessionId'));
    this.Messages = this.signalrService.messages;
    this.MatchId = Number(this.sharedService.matchId);
  }

  ngOnInit(): void {
    this.signalrService.startConnection();
    setTimeout(() => {
      this.signalrService.connectToRoom(this.CurrentUserId, this.MatchId);
      this.signalrService.checkRoomJoin();
      this.signalrService.receiveMessages();
    }, 2000);
  }

  sendMessage() {
    this.signalrService.sendMessage(this.MessageInput);
    this.MessageInput = "";
  }

  ngOnDestroy() {
    this.signalrService.hubConnection.off("serverResponse");
    this.signalrService.removeFromRoom("testGroup");
  }

  disableMessageChat() {
    this.sharedService.changeMessageState(false);
  }
}
