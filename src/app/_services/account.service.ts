import { User } from '../_models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthUser } from '../_models/auth_user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://cpcmanager.herokuapp.com/api/';
  loggedIn: boolean = false;
  loggingIndicator: boolean = false;
  private currentUserSource = new ReplaySubject(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  login(model: any) {
    this.loggingIndicator = true;
    this.http
      .post<AuthUser>(this.baseUrl + 'Account/login', model)
      .pipe(
        map((response: AuthUser) => {
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
  setCurrentUser(user: AuthUser) {
    this.currentUserSource.next(user);
  }
  getUser(id: Number): Observable<User> {
    var tmp;
    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    return this.http.get<User>(
      'https://cpcmanager.herokuapp.com/api/Users/' + id,
      header
    );
  }

  register(model: any) {
    // console.log(model);
    this.loggingIndicator = true;
    this.http.post<AuthUser>(this.baseUrl + 'Account/register', model).subscribe({
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
  getMyId(): Number {
    const token = JSON.parse(localStorage.getItem('user')!!).token;
    const x = JSON.stringify(this.jwtHelper.decodeToken(token));
    const x2 = JSON.parse(x);
    const loggedinId = x2.nameid;
    return loggedinId;
  }
  getLoggidIn() {
    if (localStorage.getItem('user') != null) return true;
    return false;

    // return this.loggedIn
  }
}
