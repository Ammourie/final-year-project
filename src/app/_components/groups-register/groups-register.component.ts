import { Student } from './../../_models/student';
import { Router } from '@angular/router';
import { UsersService } from './../../_services/users.service';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Location } from '@angular/common';



@Component({
  selector: 'app-groups-register',
  templateUrl: './groups-register.component.html',
  styleUrls: ['./groups-register.component.css'],
})
export class GroupsRegisterComponent implements OnInit {
  students: Student[] = [];
  selectedCoach:Student | undefined;


  responsiveOptions;

  constructor(
    private primengConfig: PrimeNGConfig,
    public studentService: UsersService,
    private router: Router,
    private location: Location
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
      this.selectedCoach=this.studentService.coaches[0]
    }

    this.primengConfig.ripple = true;


  }
  goback() {
    console.log("vvv");

    this.location.back();
  }
  gotoProfile(student: Student) {
    this.router.navigateByUrl('/profile/' + student.userName);
  }
  addStudent(student: Student) {
    if (this.students.length < 3) this.students.push(student);
    console.log(this.students);
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

}
