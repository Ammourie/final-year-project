import { UsersService } from '../../_services/users.service';
import { Student } from './../../_models/student';

import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  constructor(
    public studentService: UsersService,
    private router: Router,
    private location: Location
  ) {}
  ngOnInit() {
    if (this.studentService.students.length == 0) {
      this.studentService.getstudents();
    }
  }
  goback() {
    console.log("vvv");

    this.location.back();
  }
  gotoProfile(student: Student) {
    this.router.navigateByUrl('/profile/' + student.userName);
  }
  // getStudent() {
  //   this.studentService.getstudents().subscribe({
  //     next: (res) => this.students=res,
  //     error: (error) => console.log(error),
  //     complete:()=>{console.log(this.students);
  //       this.gettingStudents=false;
  //     }

  //   });;

  // }
}
