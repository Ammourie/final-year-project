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
        if(i['isCoach']){
          this.coaches.push(i)
        }else{
          this.students.push(i)
        };
              }},
      error: (error) => console.log(error),
      complete: () => {
        console.log(this.students);
        this.gettingStudents = false;
        console.log(this.students[0].fullName);
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
        console.log(this.coaches);
        this.gettingcoaches = false;
      },
    });
  }
}
