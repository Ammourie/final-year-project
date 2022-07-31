import { AccountService } from 'src/app/_services/account.service';
import { UsersService } from './../../_services/users.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent implements OnInit {

  constructor(private location:Location,public userService:UsersService,public accountService:AccountService) { }

  ngOnInit(): void {
    this.userService.getMyUser()
  }
  goback() {
    console.log("vvv");

    this.location.back();
  }
}
