import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { Router } from '@angular/router';

declare var RemObjects: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isUserLoggedin: boolean = false;

  constructor(
    public connectionService: ConnectionService,
    private router: Router
  ) { }

  public login(name, password) {
    const service = new RemObjects.SDK.RemoteService(this.connectionService.channel, this.connectionService.message, 'AuthenticationService');
    console.log(this.connectionService.channel);

    const request = service.fMessage.clone();
    request.initialize(service.fServiceName, 'LogIn');
    request.write('UserId', 'WideString', `${name}`);
    request.write('UserPsw', 'WideString', `${password}`);
    request.finalize();

    this.connectionService.channel.dispatch(request, res => {
      console.log('after login', res);
      if (res.fResponseObject.result.Result.ResultCode === 'rtOk') {
        this.router.navigate([ '/main-page' ]);
        this.isUserLoggedin = true;
      }
    }, error => {
      console.log(error);
    });
  }
}
