import { Router } from '@angular/router';
import { Student } from './../../_models/student';
import { AccountService } from './../../_services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(public accountService: AccountService, private router: Router) {}
  student: Student | undefined;
  ngOnInit(): void {
  if(this.accountService.getLoggidIn())
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
}
