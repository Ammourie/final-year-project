import { Router } from '@angular/router';
import { User } from '../_models/user';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json } from 'express';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  students: User[] = [];
  coaches: User[] = [];
  gettingStudents = false;
  gettingcoaches = false;
  studentsCurrentPage = 1;
  studentsTotalPages = 10;
  studentsTotal = 100;
  studentsItemsPerPage = 10;
  coachesCurrentPage = 1;
  coachesTotalPages = 10;
  coachesTotal = 100;
  coachesItemsPerPage = 10;

  baseUrl = 'https://cpcmanager.herokuapp.com/api/';
  constructor(private http: HttpClient, private router: Router) {}
  getstudents(page: number): User[] {
    this.studentsCurrentPage = page;
    this.gettingStudents = true;

    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`,
      }),
      observe: 'response' as 'response',
    };
    this.http
      .get<any>(
        this.baseUrl + 'Users?CoachesOnly=false&PageSize=10&PageNumber=' + page,
        httpOptions
      )
      .subscribe({
        next: (res) => {
          this.studentsTotalPages = JSON.parse(
            res.headers.get('Pagination')!
          ).TotalPages;
          this.studentsTotal = JSON.parse(
            res.headers.get('Pagination')!
          ).TotalItems;
          this.studentsItemsPerPage = JSON.parse(
            res.headers.get('Pagination')!
          ).ItemsPerPage;
          this.students = res.body;
        },
        error: (error) => console.log(error),
        complete: () => {
          this.gettingStudents = false;
        },
      });
    return this.students;
  }
  getcoaches(page: number,pageSize:number) {
    this.coachesCurrentPage = page;
    this.gettingcoaches = true;

    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`,
      }),
      observe: 'response' as 'response',
    };

    this.http
      .get<any>(
        this.baseUrl + 'Users?CoachesOnly=true&PageSize='+pageSize+'&PageNumber='+page,
        httpOptions
      )
      .subscribe({
        next: (res) => {
          console.log(res.headers.get("Pagination"));

          this.coachesTotalPages = JSON.parse(
            res.headers.get('Pagination')!
          ).TotalPages;
          this.coachesTotal = JSON.parse(
            res.headers.get('Pagination')!
          ).TotalItems;
          this.coachesItemsPerPage = JSON.parse(
            res.headers.get('Pagination')!
          ).ItemsPerPage;
          this.coaches = res.body;
        },
        error: (error) => console.log(error),
        complete: () => {
          this.gettingcoaches = false;
        },
      });
  }
  gotoProfile(student: User) {
    this.router.navigateByUrl('/profile/' + student.id);
  }
}
