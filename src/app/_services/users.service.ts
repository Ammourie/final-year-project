import { Student } from '../_models/student';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  students: Student[] = [];
  coaches: Student[] = [];
  gettingStudents = false;
  gettingcoaches = false;

  baseUrl = 'https://cpcmanager.herokuapp.com/api/';
  constructor(private http: HttpClient) {}
  getstudents() {
    this.gettingStudents = true;

    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http.get<Student[]>(this.baseUrl + 'Users', header).subscribe({
      next: (res) => {
        for (const i of res) {
          if (!i['isCoach']) this.students.push(i);
        }
      },
      error: (error) => console.log(error),
      complete: () => {
        this.gettingStudents = false;
      },
    });
  }
  getcoaches() {
    this.gettingcoaches = true;

    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http.get<Student[]>(this.baseUrl + 'Users', header).subscribe({
      next: (res) => {
        for (var i in res) {
          if (res[i].isCoach) {
            this.coaches.push(res[i]);
          }
        }
      },
      error: (error) => console.log(error),
      complete: () => {
        this.gettingcoaches = false;
      },
    });
  }
}
