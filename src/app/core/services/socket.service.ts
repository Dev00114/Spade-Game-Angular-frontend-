import { Injectable } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


const config: SocketIoConfig = { url: "http://localhost:4000", options: {} };
@Injectable({
  providedIn: 'root'
})
export class SocketService {

constructor() { }

}
