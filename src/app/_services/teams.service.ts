import { User } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  students: User[] = [];
  recommendedStudents: User[] = [];
  gettingUnteamedStudent = true;
  gettingUnteamedRecommendedStudent = false;
  studentsCurrentPage = 1;
  studentsTotalPages = 10;
  studentsTotal = 100;
  studentsItemsPerPage = 10;
  baseUrl = 'https://cpcmanager.herokuapp.com/api/';
  constructor(private http: HttpClient) {}
  getUnteamedStudents(page: number): User[] {
    this.studentsCurrentPage = page;
    this.gettingUnteamedStudent = true;

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
        this.baseUrl + 'Users?NotInATeam=true&CoachesOnly=false&PageSize=10&PageNumber=' + page,
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
          console.log(res.headers.get('Pagination'));

          this.students = res.body;
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
    this.gettingUnteamedStudent = true;

    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http
      .get<User[]>(this.baseUrl + 'Recommendation/users', header)
      .subscribe({
        next: (res) => {
          this.recommendedStudents = res;
        },
        error: (error) => console.log(error),
        complete: () => {
          this.gettingUnteamedRecommendedStudent = false;
          this.getUnteamedStudents(1);
        },
      });
    return this.recommendedStudents;
  }
}
