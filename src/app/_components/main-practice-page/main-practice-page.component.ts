import { NotService } from './../../_services/not.service';
import { AccountService } from 'src/app/_services/account.service';
import { UsersService } from './../../_services/users.service';
import { User } from './../../_models/user';
import { Problem } from './../../_models/problem';
import { Post } from './../../_models/post';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DailyTask } from './../../_models/daily_task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-main-practice-page',
  templateUrl: './main-practice-page.component.html',
  styleUrls: ['./main-practice-page.component.css'],
})
export class MainPracticePageComponent implements OnInit {
  notflag = false;
  tasksLoading: boolean = false;
  postsLoading: boolean = false;
  problemsLoading: boolean = false;
  usersLoading: boolean = false;
  tasksToShow: DailyTask[] = [];
  post: Post[] = [];
  recProblems: Problem[] = [];
  recUsers: User[] = [];
  token = JSON.parse(localStorage.getItem('user')!!).token;
  x = JSON.stringify(this.jwtHelper.decodeToken(this.token));
  x2 = JSON.parse(this.x);
  loggedinId = this.x2.nameid;
  isCoach = this.x2['role'] == 'Member,Coach';
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    public userService: UsersService,
    private location: Location,
    public accountService: AccountService,
    public notService: NotService
  ) {}

  ngOnInit(): void {
    this.userService.getMyUser();
    this.getAllTasks();
    this.getMyTasks();
    this.getPosts();
    this.getRecommendedProblems();
    this.getRecommendedUsers();
  }
  toggleFlag() {
    if (this.notflag) {
      this.notService.notflag = false;
      localStorage.setItem('task-flag', '0');
    }
    this.notflag = !this.notflag;
  }
  getPosts() {
    this.postsLoading = true;
    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http
      .get<Post[]>('https://cpcmanager.herokuapp.com/api/Blogs', header)
      .subscribe({
        next: (res) => {
          this.post = res.reverse();
        },
        error: (error) => console.log(error),
        complete: () => {
          this.postsLoading = false;
        },
      });
  }
  getMyTasks() {
    if (!this.isCoach) {
      this.tasksLoading = true;
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
            this.tasksToShow = res.reverse();
            console.log('added my tasks');
          },
          error: (error) => console.log(error),
          complete: () => {
            this.tasksLoading = false;
          },
        });
    }
  }
  getAllTasks() {
    if (this.isCoach) {
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
            this.tasksToShow = res.reverse();
            console.log('added all tasks');
          },
          error: (error) => console.log(error),
          complete: () => {
            this.tasksLoading = false;
          },
        });
    }
  }
  getRecommendedProblems() {
    this.problemsLoading = true;
    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http
      .get<Problem[]>(
        'https://cpcmanager.herokuapp.com/api/Recommendation/Problems',
        header
      )
      .subscribe({
        next: (res) => {
          this.recProblems = res;
        },
        error: (error) => console.log(error),
        complete: () => {
          this.problemsLoading = false;
        },
      });
  }
  getRecommendedUsers() {
    this.usersLoading = true;
    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http
      .get<User[]>(
        'https://cpcmanager.herokuapp.com/api/Recommendation/users',
        header
      )
      .subscribe({
        next: (res) => {
          this.recUsers = res;
          console.log(res);
        },
        error: (error) => console.log(error),
        complete: () => {
          this.usersLoading = false;
        },
      });
  }
  deletePost(i: number) {
    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http
      .delete(
        'https://cpcmanager.herokuapp.com/api/blogs/' + this.post[i].id,
        header
      )
      .subscribe({
        next: (res) => {},
        error: (error) => console.log(error),
        complete: () => {
          this.tasksLoading = false;
          this.post.splice(i, 1);
        },
      });
  }
  goback() {
    console.log('vvv');

    this.location.back();
  }
}
