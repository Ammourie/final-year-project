import { UsersService } from '../../_services/users.service';
import { Student } from './../../_models/student';

import { Component, OnInit } from '@angular/core';

import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  constructor(public studentService: UsersService) {}
  ngOnInit() {
    if(this.studentService.students.length==0){

      this.studentService.getstudents()
    }

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
