import { StatsService } from './../../_services/stats.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Student } from './../../_models/student';
import { Router } from '@angular/router';
import { UsersService } from './../../_services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coaches-list',
  templateUrl: './coaches-list.component.html',
  styleUrls: ['./coaches-list.component.css'],
})
export class CoachesListComponent implements OnInit {
  constructor(
    public coachService: UsersService,
    private router: Router,
    private jwtHelper: JwtHelperService
    ,public statsService:StatsService
  ) {}
  token = JSON.parse(localStorage.getItem('user')!!).token;
  x = JSON.stringify(this.jwtHelper.decodeToken(this.token));
  x2 = JSON.parse(this.x);
  ngOnInit(): void {
    if (this.coachService.coaches.length == 0) {
      this.coachService.getcoaches();

    }
    if(this.statsService.stats==null)
    {
      this.statsService.getStats()
    }
  }

  gotoProfile(student: Student) {
    this.router.navigateByUrl('/profile/' + student.id);
  }
}
