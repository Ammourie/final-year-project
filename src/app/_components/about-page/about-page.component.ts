
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
  constructor(
    private http: HttpClient,
    private router: Router,

  ) {}
  ngOnInit(): void {}

  test2(): void {
    const username = JSON.parse(localStorage.getItem('user')!!).username;
    console.log(username);

    this.router.navigateByUrl('/profile/'+username);

  }
}
