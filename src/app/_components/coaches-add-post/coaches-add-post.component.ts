import { Router } from '@angular/router';
import { TrainingGroup } from './../../_models/training_group';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coaches-add-post',
  templateUrl: './coaches-add-post.component.html',
  styleUrls: ['./coaches-add-post.component.css'],
})
export class CoachesAddPostComponent implements OnInit {
  problemName: string = '';
  taskDiscription: string = '';
  problems: String[] = [];
  groupDesired: TrainingGroup[] = [];
  dateUntilSolve: String = '';
  trainingGroups: TrainingGroup[] = [];
  post: string = '';
  loadingFlag = false;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getGroups();
  }
  onGroupSelected(group: TrainingGroup) {
    if (!this.groupDesired.includes(group)) {
      this.groupDesired.push(group);
    }
  }
  getGroups() {
    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http
      .get<TrainingGroup[]>(
        'https://cpcmanager.herokuapp.com/api/TrainingGroups',
        header
      )
      .subscribe({
        next: (res) => {
          this.trainingGroups = res;
        },
        error: (error) => console.log(error),
        complete: () => {
          console.log('getting groups compleated');
        },
      });
  }
  addproblem() {
    this.problems.push(this.problemName);
    this.problemName = '';
  }
  addTask() {
    this.loadingFlag = true;
    var task = {
      problems: this.problems,
      dueDate: this.dateUntilSolve,
      groupId: this.groupDesired[0].id,
      description: this.taskDiscription,
    };
    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };
    console.log(task);

    this.http
      .post('https://cpcmanager.herokuapp.com/api/DailyTasks', task, header)
      .subscribe({
        next: (res) => {},
        error: (error) => console.log(error),
        complete: () => {
          this.loadingFlag = false;
          this.problems = [];
          this.taskDiscription = '';
          this.dateUntilSolve = '';
          this.groupDesired = [];
        },
      });
  }
  uploadPost() {
    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };
    const formData = new FormData();
    formData.append('Content', this.post);

    this.http
      .post('https://cpcmanager.herokuapp.com/api/blogs', formData, header)
      .subscribe({
        next: (res) => {},
        error: (error) => console.log(error),
        complete: () => {
          this.post = '';
          this.router.navigateByUrl('/main-practice-page');

        },
      });
  }
}
