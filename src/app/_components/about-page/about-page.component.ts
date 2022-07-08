import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from './../../_models/student';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
})
export class AboutPageComponent implements OnInit {
  student: Student | undefined;
  constructor(private http: HttpClient, private router: Router,private jwtHelper :JwtHelperService
    ) {}
  ngOnInit(): void {}

  test2(): void {
    const username = JSON.parse(localStorage.getItem('user')!!).username;
    const token = JSON.parse(localStorage.getItem('user')!!).token;
    const x=JSON.stringify(this.jwtHelper.decodeToken(token));
    const x2=JSON.parse(x);
    this.router.navigateByUrl('/profile/'+x2['nameid']);
  }
}
