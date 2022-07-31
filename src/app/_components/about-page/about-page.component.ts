import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../_models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
})
export class AboutPageComponent implements OnInit {
  student: User | undefined;
  constructor(private http: HttpClient, private router: Router,private jwtHelper :JwtHelperService
    ) {}
  ngOnInit(): void {}

  test2(): void {

    this.router.navigateByUrl('/about');
  }
}
