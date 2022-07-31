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
  searchFlag = false;
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
      this.coachService.getcoaches(1, 10);
    }
    if (this.statsService.stats == null) {
      this.statsService.getStats();
    }
  }

  gotoProfile(student: User) {
    this.router.navigateByUrl('/profile/' + student.id);
  }
  searchForCoaches() {
    if (this.searchText == '') {
      this.searchFlag = false;
      this.coachService.getcoaches(1, 10);
    } else {
      this.searchFlag = true;

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
  onPageChange(event: any) {
    if (this.coachService.coachesCurrentPage != event.page + 1)
      this.coachService.getcoaches(event.page + 1, 10);
  }
}
