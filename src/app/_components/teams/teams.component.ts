import { AccountService } from 'src/app/_services/account.service';
import { UsersService } from './../../_services/users.service';
import { Router } from '@angular/router';
import { Team } from '../../_models/team';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  teamToDelete: Team | undefined;
  teamToDeleteId = 0;
  deleteDialoge = false;
  constructor(
    private location: Location,
    private httpclient: HttpClient,
    private router: Router,
    public userService: UsersService,
    public accountService: AccountService
  ) {}
  gettingTeams: boolean = true;
  teams: Team[] | undefined;
  ngOnInit(): void {
    this.userService.getMyUser();
    this.getTeams();
  }
  gotoProfile(id: Number) {
    this.router.navigateByUrl('/profile/' + id);
  }
  getTeams() {
    const auth = JSON.parse(localStorage.getItem('user')!!).token;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${auth}`,
      }),
    };
    this.httpclient
      .get<Team[]>('https://cpcmanager.herokuapp.com/api/Teams', httpOptions)
      .subscribe({
        next: (res) => {
          this.teams = res;
          console.log(res);
        },
        error: (e) => console.log(e),
        complete: () => {
          console.log(this.teams), (this.gettingTeams = false);
        },
      });
  }
  goback() {
    console.log('vvv');

    this.location.back();
  }
  showConfirmDeleteDialoge(team: Team, id: any) {
    this.teamToDeleteId = id;
    this.deleteDialoge = true;
    this.teamToDelete = team;
  }
  deleteTeam() {
    const auth = JSON.parse(localStorage.getItem('user')!!).token;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${auth}`,
      }),
    };
    this.httpclient
      .delete(
        `https://cpcmanager.herokuapp.com/api/Teams/${this.teamToDelete?.id}`,
        httpOptions
      )
      .subscribe({
        next: (res) => {},
        error: (e) => console.log(e),
        complete: () => {
          this.deleteDialoge = false;
          this.teams?.splice(this.teamToDeleteId, 1);
        },
      });
  }
}
