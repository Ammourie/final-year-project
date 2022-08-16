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
  showErrorDialoge = false;
  dialogeText = '';

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
    if (this.showErrorDialoge == false) {
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
            this.showErrorDialoge = true;
            if (error.error == 'invalid username') {
              this.dialogeText =
                'البريد الإلكتروني الذي أدخلته غير صحيح لرجاء إعادة المحاولة !!';
            } else {
              this.dialogeText =
                'كلمة السر التي أدخلتها غير صحيحة الرجاء إعادة المحاولة !!';
            }
            this.loggingIndicator = false;
          },
          complete: () => {
            console.log('compleated');

            this.loggingIndicator = false;
            this.router.navigate(['/']);
          },
        });
    }
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
    this.http
      .post<AuthUser>(this.baseUrl + 'Account/register', model)
      .subscribe({
        error: (error) => {
          console.log(error);
          this.showErrorDialoge = true;
          if (error.error.errors) {
            for (const key in error.error.errors) {
              if (error.error.errors.hasOwnProperty(key)) {
                var val = error.error.errors[key];
                console.log(val);

                if (val[0] == 'The Email field is required.')
                  this.dialogeText += 'الرجاء إدخال بريد الكتروني' + '\n';
                else if (val[0] == 'The FullName field is required.')
                  this.dialogeText += 'الرجاء إدخال اسمك الكامل' + '\n';
                else
                  this.dialogeText +=
                    'الرجاء إدخال كلمة سر تحوي أرقاماً وأحرفاً لايقل طولها عن 5 ولا يزيد عن 16' +
                    '\n';
              }
            }
          } else {
            this.dialogeText =
            'البريد الإلكتروني الذي أدخلته مأخوذ مسبقاُ الرجاء إدخال بريد آخر !!';
          }
          this.loggingIndicator = false;
        },
        complete: () => {
          this.login(model);
        },
      });
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('task-flag');
    localStorage.removeItem('task-num');
    this.currentUserSource.next(null);
  }
  getMyToken(): string {
    const auth = JSON.parse(localStorage.getItem('user')!!).token;
    return auth;
  }
  getMyId(): number {
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
