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
  RoomId:string;

  constructor() {
    this.CurrentUser = String(sessionStorage.getItem('SessionKeyEmail'));
    this.Messages = [];
    this.MessagesSubject = new Subject();
    this.RoomId = "";
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

  disconnect() {

  }

  connectToRoom(userId:number, matchId:number) {
    console.log("add to room", userId, matchId)
    this.hubConnection.invoke("ConnectToRoom", userId, matchId)
    .catch(err => console.error(err));
  }

  removeFromRoom(groupName:string) {
    this.hubConnection.invoke("RemoveFromRoom", groupName)
    .catch(err => console.error(err));
  }

  checkRoomJoin() {
    this.hubConnection.on("roomJoin", (data) => {
      console.log(data);
      this.RoomId = data;
    });
  }

  sendMessage(message:string) {
    this.hubConnection.invoke("SendMessage",
      this.CurrentUser, message, this.RoomId)
    .catch(err => console.error(err));
  }

  receiveMessages() {
    this.hubConnection.on("messageResponse", (userName: string, message: string) => {
      this.Messages.push({userName: userName, message: message})
    });
  }
}
