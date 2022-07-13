import { TrainingGroup } from './../../_models/training_group';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Student } from './../../_models/student';
import { UsersService } from './../../_services/users.service';
import { Group } from './../../_models/group';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-practice-groubs',
  templateUrl: './practice-groubs.component.html',
  styleUrls: ['./practice-groubs.component.css'],
})
export class PracticeGroubsComponent implements OnInit {
  showGroupDetailsModal: boolean = false;
  showGroupCreateModal: boolean = false;
  loadingGroups: boolean = false;
  token = JSON.parse(localStorage.getItem('user')!!).token;
  x = JSON.stringify(this.jwtHelper.decodeToken(this.token));
  x2 = JSON.parse(this.x);
  selectedCoach: Student | undefined;
  selectedLevel: any;
  levels = [{ level: 'easy' }, { level: 'medium' }, { level: 'hard' }];
  groupForCreate: Group = {
    name: '',
    coach: 0,
    students: [],
    id: 0,
  };
  trainingGroups: TrainingGroup[] = [];
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
    public studentService: UsersService
  ) {}

  ngOnInit(): void {
    if (this.studentService.students.length == 0) {
      this.studentService.getcoaches();
      this.selectedCoach = this.studentService.coaches[0];
    }
    this.getGroups();
  }

  showGroupDetailsDialoge() {
    this.showGroupDetailsModal = true;
  }
  showGroupCreateDialoge() {
    this.showGroupCreateModal = true;
  }
  getGroups() {
    this.loadingGroups = true;
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
          this.loadingGroups = false;
          console.log('getting groups compleated');
        },
      });
  }
  submitGroup() {
    this.groupForCreate.coach = this.selectedCoach?.id!;
    console.log(this.groupForCreate);

    const auth = JSON.parse(localStorage.getItem('user')!!).token;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${auth}`,
      }),
    };

    this.http
      .post(
        'https://cpcmanager.herokuapp.com/api/TrainingGroups',
        this.groupForCreate,
        httpOptions
      )
      .subscribe({
        next: (e) => {},
        error: (e) => {},
        complete: () => {
          // this.displayModal = false;
          // this.students = [];
          // this.rou ter.navigateByUrl('/teams');

          this.selectedCoach = undefined;
          this.selectedLevel = undefined;
          this.groupForCreate = {
            name: '',
            coach: 0,
            students: [],
            id: 0,
          };
          this.showGroupCreateModal = false;
          this.getGroups()
        },
      });
  }
}
