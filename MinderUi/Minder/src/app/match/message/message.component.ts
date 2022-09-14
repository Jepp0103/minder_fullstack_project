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
  RoomId:string;

  constructor(public signalrService: SignalrService, private sharedService:SharedService) {
    this.CurrentUsername = String(sessionStorage.getItem('SessionKeyEmail'));
    this.CurrentUserId = Number(sessionStorage.getItem('SessionId'));
    this.MatchId = Number(this.sharedService.matchId);
    this.RoomId = this.signalrService.roomId;
  }

  ngOnInit(): void {
    this.signalrService.startConnection();
    setTimeout(() => {
      this.signalrService.connectToRoom(this.CurrentUserId, this.MatchId);
      this.signalrService.checkRoomJoin();
    }, 1000);
    setTimeout(() => {
      //Enabling to receive socket messages from signal r.
      this.Messages = this.signalrService.messages;
      this.signalrService.receiveMessages();
    }, 2000);
  }

  sendMessage() {
    this.signalrService.sendMessage(this.MessageInput);
    this.MessageInput = "";
  }

  ngOnDestroy() {
    let messageResponseRoom = "messageResponse" + this.RoomId;
    this.signalrService.hubConnection.off(messageResponseRoom);
    this.signalrService.removeFromRoom();
  }

  disableMessageChat() {
    this.sharedService.changeMessageState(false);
  }
}
