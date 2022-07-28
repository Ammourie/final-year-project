import { StatsService } from './../../_services/stats.service';
import { UsersService } from '../../_services/users.service';
import { Student } from './../../_models/student';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  value: number = 69;
  searchString = '';
  constructor(
    public studentService: UsersService,
    private router: Router,
    private location: Location,
    public statsService: StatsService
  ) {}
  ngOnInit() {
    if (this.studentService.students.length == 0) {
      this.studentService.getstudents();
    }
    if (this.statsService.stats == null) {
      this.statsService.getStats();
    }
  }
  goback() {
    console.log('vvv');

    this.location.back();
  }
  gotoProfile(student: Student) {
    this.router.navigateByUrl('/profile/' + student.id);
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
  // @ViewChild('searchElement') searchElement: ElementRef | undefined;

  // ngAfterViewInit(): void {
  //   fromEvent(this.searchElement?.nativeElement, 'input')
  //     .pipe(map((event: any) => (event.target as HTMLInputElement).value))
  //     .pipe(debounceTime(1000))
  //     .pipe(distinctUntilChanged())
  //     .subscribe((data) => this.x());
  // }
  x() {
    console.log(this.searchString);
  }
}
