import {Injectable} from '@angular/core';

declare var RemObjects: any;

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  channel: any;
  message: any;

  constructor(
  ) {
    this.channel = new RemObjects.SDK.HTTPClientChannel('http://' + '195.225.145.161:2404' + '/JSON');
    this.message = new RemObjects.SDK.JSONMessage();
    console.log('ConnectionService', this.channel);

  }
}
