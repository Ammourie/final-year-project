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
  constructor(public coachService: UsersService,private router:Router) {}

  ngOnInit(): void {
    if (this.coachService.coaches.length == 0) {
      this.coachService.getcoaches();
    }
  }

  gotoProfile(student: Student) {
    this.router.navigateByUrl('/profile/' + student.userName);
  }
}
