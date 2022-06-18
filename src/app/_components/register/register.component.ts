import { AccountService } from './../../_services/account.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loggedIn: boolean = false;
  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}
  register() {

    this.accountService.register(this.model);
  }
}
