import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from 'src/app/_services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(
    public accountService: AccountService,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {}
  isCoach() {
    try {
      const token = JSON.parse(localStorage.getItem('user')!!).token;
      const x = JSON.stringify(this.jwtHelper.decodeToken(token));
      const x2 = JSON.parse(x);
      const isCoach = x2['role'] == 'Member,Coach';
      return isCoach;
    } catch (error) {}
    return false;
  }
}
