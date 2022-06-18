import { AccountService } from './_services/account.service';
import { User } from './_models/user';
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
      const user: User = JSON.parse(tmp);

      this.accountService.setCurrentUser(user);
    }
  }
}
