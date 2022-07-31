import { User } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  gettingSearchedStudents = false;
  gettingSearchedCoaches = false;
  constructor(private http: HttpClient) {}
  coachesSearch(keyword: string) {
    console.log( 'https://cpcmanager.herokuapp.com/api/users/search?q=' +
    keyword +
    '&coachOnly=True');

    this.gettingSearchedCoaches = true;

    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };
      return this.http.get<User[]>(
        'https://cpcmanager.herokuapp.com/api/users/search?q=' +
          keyword +
          '&coachOnly=True',
        header
      );

  }
  studentsSearch(keyword: string): any {

    this.gettingSearchedStudents = true;

    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };
    if (keyword==""){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth}`,
        }),

      };
      return this.http
        .get<User[]>(
          "https://cpcmanager.herokuapp.com/api/Users?NotInATeam=true&CoachesOnly=false&PageSize=10&PageNumber=1",
          httpOptions
        )
    }
      return this.http.get<User[]>(
        'https://cpcmanager.herokuapp.com/api/users/search?q=' +
          keyword +
          '&coachOnly=False',
        header
      );

  }
}
