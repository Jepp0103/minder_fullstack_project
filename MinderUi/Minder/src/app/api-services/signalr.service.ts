import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import MySettings  from '../../assets/MySettings.json';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  hubConnection:signalR.HubConnection;
  CurrentUser:string;
  Messages:any=[];
  MessagesSubject:Subject<any[]>;


  constructor() {
    this.CurrentUser = String(sessionStorage.getItem('SessionKeyEmail'));
    this.Messages = [];
    this.MessagesSubject = new Subject();
  }

  get messages(): Subject<any[]> {
    return this.Messages;
  }

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(MySettings.signalrUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    })
    .build();
    this.hubConnection
    .start()
    .then(() => {
        console.log('Hub Connection Started!');
    })
    .catch(err => console.log('Error while starting connection: ' + err))
  }

  addToChatGroup(userName:string, groupName:string) {
    this.hubConnection.invoke("AddToGroup", userName, groupName)
    .catch(err => console.error(err));
  }

  removeFromGroup(groupName:string) {
    this.hubConnection.invoke("RemoveFromGroup", groupName)
    .catch(err => console.error(err));
  }

  checkGroupJoin() {
    this.hubConnection.on("groupJoin", (message) => {
      console.log(message);
    });
  }

  sendMessage(message:string) {
    this.hubConnection.invoke("SendMessage",
      this.CurrentUser, message)
    .catch(err => console.error(err));
  }

  receiveMessages() {
    this.hubConnection.on("messageResponse", (userName: string, message: string) => {
      this.Messages.push({userName: userName, message: message})
      this.MessagesSubject.next(this.Messages);
    });
  }
}
