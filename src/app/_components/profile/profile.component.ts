import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Student } from './../../_models/student';
import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  student: Student | undefined;
  loading = true;
  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) {}
  // constructor(private http: HttpClient) {
  //   const username = JSON.parse(localStorage.getItem('user')!!).username;
  //   const auth= JSON.parse(localStorage.getItem('user')!!).token

  //   var header = {
  //     headers: new HttpHeaders()
  //    . set('Authorization',  `Bearer ${auth}`)
  //   }

  //   http
  //     .get<Student>('https://cpcmanager.herokuapp.com/api/Users/' + username,header)
  //     .subscribe({
  //       next: (r) => this.student=r,
  //       complete:()=>console.log("ccc")

  //     });
  // }

  goback() {
    this.location.back();
  }
  ngOnInit(): void {
    const username =
      this.router.url.split('/')[this.router.url.split('/').length - 1];

    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http
      .get<Student>(
        'https://cpcmanager.herokuapp.com/api/Users/' + username,
        header
      )
      .subscribe({
        next: (r) => {
          this.student = r;
        },
        error:(error)=>{
          if(error.status===404){
            this.router.navigateByUrl('/notfound');

          }
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
