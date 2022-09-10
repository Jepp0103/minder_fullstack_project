import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import MySettings  from '../../assets/MySettings.json';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  hubConnection:signalR.HubConnection;
  constructor() { }

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

  askServer(message:string) {
    this.hubConnection.invoke("receiveClientMessage", message)
    .catch(err => console.error(err));
  }

  askServerListener() {
    this.hubConnection.on("serverResponse", (someText) => {
        console.log(someText);
    });
  }


}
