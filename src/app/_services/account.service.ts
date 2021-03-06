import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://cpcmanager.herokuapp.com/api/';
  loggedIn: boolean = false;
  loggingIndicator: boolean = false;
  private currentUserSource = new ReplaySubject(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient, private router: Router) {}

  login(model: any) {
    this.loggingIndicator = true;
    this.http
      .post<User>(this.baseUrl + 'Account/login', model)
      .pipe(
        map((response: User) => {
          console.log(response);
          const user = response;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        })
      )
      .subscribe({
        next: (res) => {},
        error: (error) => {
          console.log(error);
          this.loggingIndicator = false;
        },
        complete: () => {
          console.log('compleated');

          this.loggingIndicator = false;
          this.router.navigate(['/']);
        },
      });
  }
  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  register(model: any) {
    // console.log(model);
    this.loggingIndicator = true;
    this.http.post<User>(this.baseUrl + 'Account/register', model).subscribe({
      error: (error) => {
        console.log(error);
        this.loggingIndicator = false;
      },
      complete: () => this.login(model),
    });
  }
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
  getMyToken(): string {
    const auth = JSON.parse(localStorage.getItem('user')!!).token;
    return auth;
  }
}
