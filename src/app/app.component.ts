import { AccountService } from './_services/account.service';
import { AuthUser } from './_models/auth_user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ACM';
  users: any;
  constructor(private accountService: AccountService) {}
  ngOnInit(): void {
    this.setCurrentUser();
  }
  setCurrentUser() {
    const tmp = localStorage.getItem('user');
    console.log('this is user' + tmp);

    if (tmp != null) {
      const user: AuthUser = JSON.parse(tmp);

      this.accountService.setCurrentUser(user);
    }
  }
}
