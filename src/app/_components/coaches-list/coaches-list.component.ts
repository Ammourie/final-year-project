import { SearchService } from './../../_services/search.service';
import { StatsService } from './../../_services/stats.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../_models/user';
import { Router } from '@angular/router';
import { UsersService } from './../../_services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coaches-list',
  templateUrl: './coaches-list.component.html',
  styleUrls: ['./coaches-list.component.css'],
})
export class CoachesListComponent implements OnInit {
  searchText = '';
  constructor(
    public coachService: UsersService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    public statsService: StatsService,
    public searchService: SearchService
  ) {}
  token = JSON.parse(localStorage.getItem('user')!!).token;
  x = JSON.stringify(this.jwtHelper.decodeToken(this.token));
  x2 = JSON.parse(this.x);
  ngOnInit(): void {
    if (this.coachService.coaches.length == 0) {
      this.coachService.getcoaches();
    }
    if (this.statsService.stats == null) {
      this.statsService.getStats();
    }
  }

  gotoProfile(student: User) {
    this.router.navigateByUrl('/profile/' + student.id);
  }
  searchForCoaches() {
    this.searchService.coachesSearch(this.searchText).subscribe({
      next: (res) => {
        this.coachService.coaches = [];
        console.log(res);

        res.forEach((element) => {
          if (element.isCoach) this.coachService.coaches.push(element);
        });
      },
      error: (error) => console.log(error),
      complete: () => {
        this.searchService.gettingSearchedCoaches = false;
      },
    });
  }
}
