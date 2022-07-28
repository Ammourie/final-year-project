import { User } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  students: User[] = [];
  coaches: User[] = [];
  gettingStudents = false;
  gettingcoaches = false;

  baseUrl = 'https://cpcmanager.herokuapp.com/api/';
  constructor(private http: HttpClient) {}
  getstudents():User[] {
    this.gettingStudents = true;

    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http.get<User[]>(this.baseUrl + 'Users', header).subscribe({
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
    return this.students
  }
  getcoaches() {
    this.gettingcoaches = true;

    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http.get<User[]>(this.baseUrl + 'Users', header).subscribe({
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
