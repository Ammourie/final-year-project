import { NotService } from './../../_services/not.service';
import { AccountService } from 'src/app/_services/account.service';
import { UsersService } from './../../_services/users.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css'],
})
export class CoachesComponent implements OnInit {
  notflag = false;
  constructor(
    private location: Location,
    public userService: UsersService,
    public accountService: AccountService,
    public notService: NotService
  ) {}

  ngOnInit(): void {
    this.userService.getMyUser();
  }
  toggleFlag() {

    if (this.notflag) {
      this.notService.notflag = false;
      localStorage.setItem('task-flag', '0');
    }
    this.notflag = !this.notflag;
  }
  goback() {
    console.log('vvv');

    this.location.back();
  }
}
