import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../../api-services/signalr.service';
import MySettings  from '../../../assets/MySettings.json';
import { SharedService } from 'src/app/api-services/shared.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  MessageInput:string;
  users:any=[];

  constructor(public signalrService: SignalrService, private sharedService:SharedService) {
  }

  ngOnInit(): void {
    this.signalrService.startConnection();
    this.userOnLis(String(sessionStorage.getItem('SessionKeyEmail')));

    setTimeout(() => {
      this.signalrService.askServerListener();
    }, 2000);
  }

  sendMessage() {
    this.signalrService.askServer(this.MessageInput);
    this.MessageInput = "";
  }

  ngOnDestroy() {
    this.signalrService.hubConnection.off("serverResponse");
  }

  disableMessageChat() {
    this.sharedService.changeMessageState(false);
 }

 userOnLis(newUser:string): void {
  this.signalrService.hubConnection.on("userOn", (newUser) => {
    console.log(newUser);
    this.users.push(newUser);
    console.log("this users", this.users)
  });
}

userOffLis(): void {
  this.signalrService.hubConnection.on("userOff", (personId: string) => {
    this.users = this.users.filter(u => u.id != personId);
  });
}

}
