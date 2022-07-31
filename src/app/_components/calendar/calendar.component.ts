import { UsersService } from './../../_services/users.service';
import { User } from './../../_models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CalenderEvent } from './../../_models/event';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  loading = false;
  date = new Date();
  month = this.date.toLocaleString('ar', { month: 'long' });
  monthNum = this.date.getMonth() + 1;
  year = this.date.getFullYear();
  calenderEvents: CalenderEvent[] = [];
  upcomingEvents: CalenderEvent[] = [];
  event: CalenderEvent | undefined;

  postEvent: CalenderEvent = {
    id: 0,
    sessionDate: '',
    description: '',
  };
  token = JSON.parse(localStorage.getItem('user')!!).token;
  x = JSON.stringify(this.jwtHelper.decodeToken(this.token));
  x2 = JSON.parse(this.x);
  loggedinId = this.x2.nameid;
  isCoach = this.x2['role'] == 'Member,Coach';

  postSessionDate = '';
  showEventFlag = false;
  showEventPostFlag = false;
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private location: Location,
    public userService: UsersService,
    public accountService:AccountService
  ) {}

  ngOnInit(): void {
    this.getEvents();
    this.userService.getMyUser();
  }
  activeCell(i: number): boolean {
    var x = false;
    this.calenderEvents.forEach((element) => {
      if (element.sessionDate == i.toString()) {
        x = true;
      }
    });
    return x;
  }
  showEvent(i: number) {
    this.calenderEvents.forEach((element) => {
      if (element.sessionDate == i.toString()) {
        this.event = element;
      }
    });

    this.showEventFlag = true;
    console.log(this.event);
  }

  getEvents() {
    this.loading = true;
    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http
      .get<CalenderEvent[]>(
        'https://cpcmanager.herokuapp.com/api/TrainingSessions/month/' +
          this.monthNum,
        header
      )
      .subscribe({
        next: (res) => {
          this.calenderEvents = res;
        },
        error: (error) => console.log(error),
        complete: () => {
          for (const i in this.calenderEvents) {
            this.calenderEvents[i].sessionDate = new Date(
              this.calenderEvents[i].sessionDate
            )
              .getUTCDate()
              .toString();
          }
          this.getNearEvents();
        },
      });
  }
  getNearEvents() {
    this.loading = true;
    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http
      .get<CalenderEvent[]>(
        'https://cpcmanager.herokuapp.com/api/TrainingSessions/Upcoming',
        header
      )
      .subscribe({
        next: (res) => {
          this.upcomingEvents = res;
        },
        error: (error) => console.log(error),
        complete: () => {
          // for (const i in this.calenderEvents) {
          //   this.calenderEvents[i].sessionDate = new Date(
          //     this.calenderEvents[i].sessionDate
          //   )
          //     .getUTCDate()
          //     .toString();
          // }
          this.loading = false;
        },
      });
  }
  uploadEvent() {
    this.postEvent.sessionDate = new Date(this.postSessionDate).toISOString();

    const auth = JSON.parse(localStorage.getItem('user')!!).token;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${auth}`,
      }),
    };

    this.http
      .post(
        'https://cpcmanager.herokuapp.com/api/TrainingSessions',
        this.postEvent,
        httpOptions
      )
      .subscribe({
        next: (e) => {},
        error: (e) => {},
        complete: () => {
          this.showEventPostFlag = false;
          this.postEvent = {
            id: 0,
            sessionDate: '',
            description: '',
          };
          this.postSessionDate = '';
          this.getEvents();
        },
      });
  }
  goback() {
    console.log('vvv');

    this.location.back();
  }
}
