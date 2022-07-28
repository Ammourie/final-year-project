import { User } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  students: User[] = [];
  recommendedStudents: User[] = [];
  gettingUnteamedStudent = false;
  gettingUnteamedRecommendedStudent = false;
  baseUrl = 'https://cpcmanager.herokuapp.com/api/';
  constructor(private http: HttpClient) {}
  getUnteamedStudents(): User[] {
    this.gettingUnteamedStudent = true;

    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http.get<User[]>(this.baseUrl + 'Users', header).subscribe({
      next: (res) => {
        res.forEach((element) => {
          if (!element.isCoach && element.teams.length == 0)
            this.students.push(element);
        });
      },
      error: (error) => console.log(error),
      complete: () => {
        this.gettingUnteamedStudent = false;
      },
    });
    return this.students;
  }
  getUnteamedRecommendedStudents(): User[] {
    this.gettingUnteamedRecommendedStudent = true;

    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http.get<User[]>(this.baseUrl + 'Users', header).subscribe({
      next: (res) => {
        res.forEach((element) => {
          if (!element.isCoach && element.teams.length == 0)
            this.recommendedStudents.push(element);
        });
      },
      error: (error) => console.log(error),
      complete: () => {
        this.gettingUnteamedRecommendedStudent = false;
        this.getUnteamedStudents();
      },
    });
    return this.recommendedStudents;
  }
}
