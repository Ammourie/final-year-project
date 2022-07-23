import { Problem } from './../../_models/problem';
import { Post } from './../../_models/post';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DailyTask } from './../../_models/daily_task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  tasksLoading: boolean = false;
  postsLoading: boolean = false;
  problemsLoading: boolean = false;
  tasksToShow: DailyTask[] = [];
  post: Post[] = [];
  recProblems: Problem[] = [];
  token = JSON.parse(localStorage.getItem('user')!!).token;
  x = JSON.stringify(this.jwtHelper.decodeToken(this.token));
  x2 = JSON.parse(this.x);
  loggedinId = this.x2.nameid;
  isCoach = this.x2['role'] == 'Member,Coach';
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    this.getAllTasks();
    this.getMyTasks();
    this.getPosts();
    this.getRecommendedProblems();
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
          'https://cpcmanager.herokuapp.com/api/DailyTasks/my',
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
        'https://cpcmanager.herokuapp.com/api/Recommendation',
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
}
