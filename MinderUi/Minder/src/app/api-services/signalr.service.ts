import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import MySettings  from '../../assets/MySettings.json';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  hubConnection:signalR.HubConnection;
  CurrentUser:string;
  CurrentUserId:string;
  Messages:any=[];
  MessagesSubject:Subject<any[]>;
  RoomId:string;
  readonly APIUrl = MySettings.baseUrl;

  constructor(private http:HttpClient) {
    this.CurrentUser = String(sessionStorage.getItem('SessionKeyEmail'));
    this.CurrentUserId = String(sessionStorage.getItem('SessionId'));
    this.Messages = [];
    this.MessagesSubject = new Subject();
    this.RoomId = "";
  }

  get messages() {
    return this.Messages;
  }

  get roomId() {
    return this.RoomId;
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

  connectToRoom(userId:number, matchId:number) {
    this.hubConnection.invoke("ConnectToRoom", userId, matchId)
    .catch(err => console.error(err));
  }

  removeFromRoom() {
    this.hubConnection.invoke("RemoveFromRoom", this.RoomId)
    .catch(err => console.error(err));
    this.Messages = [];
  }

  checkRoomJoin() {
    this.hubConnection.on("roomJoin", (data) => {
      this.RoomId = data;

      //Calling stored messages from the db.
      this.callStoredMessages(Number(this.RoomId)).subscribe(data => {
        this.Messages = data;
      });
    });
  }

  sendMessage(message:string) {
    this.hubConnection.invoke("SendMessage",
      this.CurrentUser, this.CurrentUserId, message, this.RoomId)
    .catch(err => console.error(err));
  }

  receiveMessages() {
    let messageResponseRoom = "messageResponse" + this.RoomId;
    this.hubConnection.on(messageResponseRoom, (userName: string, text: string) => {

      this.Messages.push({userName: userName, message: text})
    });
  }

  callStoredMessages(roomId:number):Observable<any> {
    return this.http.get<any>(this.APIUrl + '/messages/' + roomId);
  }

}
