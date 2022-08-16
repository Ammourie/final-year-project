import { DailyTask } from './../_models/daily_task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotService {
  notflag = parseInt(localStorage.getItem('task-flag')!)==1;
  constructor(private http: HttpClient) {}
  getNotifications() {
    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http
      .get<DailyTask[]>(
        'https://cpcmanager.herokuapp.com/api/DailyTasks/my-stats',
        header
      )
      .subscribe({
        next: (res) => {
          console.log(res);

          const taskNum = localStorage.getItem('task-num');
          if (taskNum == null) {
            localStorage.setItem('task-num', res.length.toString());
            localStorage.setItem('task-flag', '0');

          } else {
            const taskNum2 = parseInt(localStorage.getItem('task-num')!);
            console.log(taskNum2);

            if (res.length > taskNum2) {
              localStorage.setItem('task-flag', '1');
              this.notflag=true
              localStorage.setItem('task-num', res.length.toString());
            }
          }
        },
        error: (error) => console.log(error),
        complete: () => {},
      });
  }
}
