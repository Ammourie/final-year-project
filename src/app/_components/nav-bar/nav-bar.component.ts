import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from '../../_models/user';
import { AccountService } from './../../_services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(
    public accountService: AccountService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}
  student: User | undefined;
  ngOnInit(): void {
    if (this.accountService.getLoggidIn())
      this.getUser(this.accountService.getMyId());
  }
  getUser(id: Number) {
    this.accountService.getUser(id).subscribe({
      next: (r) => {
        this.student = r;
      },
      error: (error) => {
        if (error.status == 404) {
          this.router.navigateByUrl('/notfound');
        }
      },
      complete: () => {},
    });
  }
  logout() {
    this.accountService.logout();
  }
  goToMyProfile(): void {
    this.router.navigateByUrl('/profile/' + this.accountService.getMyId());
  }
  isCoach() {
    try {
      const token = JSON.parse(localStorage.getItem('user')!!).token;
      const x = JSON.stringify(this.jwtHelper.decodeToken(token));
      const x2 = JSON.parse(x);
      const isCoach = x2['role'] == 'Member,Coach';
      return isCoach;
    } catch (error) {}
    return false
  }
}
