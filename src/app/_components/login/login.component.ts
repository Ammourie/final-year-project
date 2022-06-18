import { AccountService } from './../../_services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}
  login() {
    console.log(this.model);
    this.accountService.login(this.model);


  }
}
