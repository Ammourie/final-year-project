import { UsersService } from './../../_services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coaches-list',
  templateUrl: './coaches-list.component.html',
  styleUrls: ['./coaches-list.component.css'],
})
export class CoachesListComponent implements OnInit {
  constructor(public coachService: UsersService) {}

  ngOnInit(): void {
    if (this.coachService.coaches.length == 0) {
      this.coachService.getcoaches();
    }
  }
}
