import { NotService } from './_services/not.service';
import { DailyTask } from './_models/daily_task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from './_services/account.service';
import { AuthUser } from './_models/auth_user';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ACM';
  users: any;
  constructor(
    private accountService: AccountService,
    private notService: NotService
  ) {}
  ngOnInit(): void {
    this.setCurrentUser();
    const counter = interval(5000);

    const updateLastSeen = counter.subscribe({
      next: () => {
        this.notService.getNotifications();
      },
    });
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
