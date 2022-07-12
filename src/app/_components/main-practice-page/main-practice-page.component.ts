import { JwtHelperService } from '@auth0/angular-jwt';
import { DailyTask } from './../../_models/daily_task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-practice-page',
  templateUrl: './main-practice-page.component.html',
  styleUrls: ['./main-practice-page.component.css'],
})
export class MainPracticePageComponent implements OnInit {
  tasksLoading: boolean = false;
  postsLoading: boolean = false;
  tasksToShow: DailyTask[] = [];
  token = JSON.parse(localStorage.getItem('user')!!).token;
  x = JSON.stringify(this.jwtHelper.decodeToken(this.token));
  x2 = JSON.parse(this.x);
  isCoach = this.x2['role'] == 'Member,Coach';
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    this.getAllTasks();
    this.getMyTasks();
  }

  getMyTasks() {
    this.tasksLoading = true;
    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http
      .get<DailyTask[]>(
        'https://cpcmanager.herokuapp.com/api/DailyTasks/My',
        header
      )
      .subscribe({
        next: (res) => {
          if (!this.isCoach) {
            this.tasksToShow = res;
            console.log('added my tasks');
          }
        },
        error: (error) => console.log(error),
        complete: () => {
          this.tasksLoading = false;
        },
      });
  }
  getAllTasks() {
    this.tasksLoading = true;
    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http
      .get<DailyTask[]>(
        'https://cpcmanager.herokuapp.com/api/DailyTasks',
        header
      )
      .subscribe({
        next: (res) => {
          if (this.isCoach) {
            this.tasksToShow = res;
            console.log('added all tasks');
          }
        },
        error: (error) => console.log(error),
        complete: () => {
          this.tasksLoading = false;

        },
      });
  }
}
