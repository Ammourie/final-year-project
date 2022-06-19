import { Observable } from 'rxjs';
import { Student } from '../_models/student';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  students: Student[] = [];
  coaches: Student[] = [];
  gettingStudents=false;
  gettingcoaches=false;

  baseUrl = 'https://cpcmanager.herokuapp.com/api/';
  constructor(private http: HttpClient) {}
  getstudents(){
    this.gettingStudents=true;

    const auth= JSON.parse(localStorage.getItem('user')!!).token

    var header = {
      headers: new HttpHeaders()
     . set('Authorization',  `Bearer ${auth}`)
    }

     this.http
    .get<Student[]>(this.baseUrl+"Users",header).subscribe({
      next: (res) => this.students=res,
      error: (error) => console.log(error),
      complete:()=>{console.log(this.students);
        this.gettingStudents=false;
      }

    })

  }
  getcoaches(){
    this.gettingcoaches=true;

    const auth= JSON.parse(localStorage.getItem('user')!!).token

    var header = {
      headers: new HttpHeaders()
     . set('Authorization',  `Bearer ${auth}`)
    }

     this.http
    .get<Student[]>(this.baseUrl+"Users",header).subscribe({
      next: (res) => this.coaches=res,
      error: (error) => console.log(error),
      complete:()=>{console.log(this.coaches);
        this.gettingcoaches=false;
      }

    })

  }
}
