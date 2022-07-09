import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../../_models/student';
import { Router } from '@angular/router';
import { UsersService } from '../../_services/users.service';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teams-register',
  templateUrl: './teams-register.component.html',
  styleUrls: ['./teams-register.component.css'],
})
export class TeamsRegisterComponent implements OnInit {
  students: Student[] = [];
  selectedCoach: Student | undefined;
  group: any = {
    name: '',
    students: [],
  };
  responsiveOptions;

  constructor(
    private primengConfig: PrimeNGConfig,
    public studentService: UsersService,
    private router: Router,
    private location: Location,
    private httpclient: HttpClient
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1350px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '760px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
  ngOnInit() {
    if (this.studentService.students.length == 0) {
      this.studentService.getstudents();
      this.studentService.getcoaches();
      this.selectedCoach = this.studentService.coaches[0];
    }

    this.primengConfig.ripple = true;
  }
  goback() {
    console.log('vvv');

    this.location.back();
  }
  gotoProfile(student: Student) {
    this.router.navigateByUrl('/profile/' + student.id);
  }
  addStudent(student: Student) {
    if (!this.students.includes(student)) {
      if (this.students.length < 3) this.students.push(student);
      console.log(this.students);
    }
  }
  deleteStudent(element: number) {
    this.students.forEach((value, index) => {
      if (element == index) {
        console.log('hello');

        this.students.splice(index, 1);
      }
    });
  }
  displayModal: boolean = false;

  showModalDialog() {
    this.displayModal = true;
  }

  registerGroup() {
    for (const i of this.students) {
      this.group.students.push(i.id);
    }

    const auth = JSON.parse(localStorage.getItem('user')!!).token;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${auth}`,
      }),
    };

    this.httpclient
      .post(
        'https://cpcmanager.herokuapp.com/api/TrainingGroups',
        this.group,
        httpOptions
      )
      .subscribe({
        next: (e) => {
          console.log(e);
        },
        error: (e) => console.log(e),
        complete: () => {
          console.log('completed');

          this.displayModal = false;
          this.students=[];
          this.router.navigateByUrl("/teams")
        },
      });
  }
}
