import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../../api-services/signalr.service';
import { SharedService } from 'src/app/api-services/shared.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  MessageInput:string;
  CurrentUser:string;
  Messages:any=[];

  constructor(public signalrService: SignalrService, private sharedService:SharedService) {
    this.CurrentUser = String(sessionStorage.getItem('SessionKeyEmail'));
    this.Messages = this.signalrService.messages;
  }

  ngOnInit(): void {
    this.signalrService.startConnection();
    setTimeout(() => {
      this.signalrService.addToChatGroup(this.CurrentUser, "testGroup");
      this.signalrService.checkGroupJoin();
      this.signalrService.receiveMessages();
    }, 2000);
  }

  sendMessage() {
    this.signalrService.sendMessage(this.MessageInput);
    this.MessageInput = "";
  }

  ngOnDestroy() {
    this.signalrService.hubConnection.off("serverResponse");
    this.signalrService.removeFromGroup("testGroup");
  }

  disableMessageChat() {
    this.sharedService.changeMessageState(false);
  }

}
