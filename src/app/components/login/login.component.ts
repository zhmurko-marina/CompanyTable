import {Component, OnInit} from '@angular/core';
import {LoginFormModel} from './login.model';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: any;
  constructor(
    public loginService: LoginService
  ) {
    this.form = new LoginFormModel();
  }

  ngOnInit() {
  }

  public login() {
    this.loginService.login(this.form.email, this.form.password);
  }

}
