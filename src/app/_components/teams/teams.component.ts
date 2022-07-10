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
  constructor(private location: Location, private httpclient: HttpClient) {}
  gettingTeams: boolean = true;
  team: Team[] | undefined;
  ngOnInit(): void {
    this.getGroups();
  }
  getGroups() {
    const auth = JSON.parse(localStorage.getItem('user')!!).token;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${auth}`,
      }),
    };
    this.httpclient
      .get<Team[]>(
        'https://cpcmanager.herokuapp.com/api/Teams',
        httpOptions
      )
      .subscribe({
        next: (res) => (this.team = res),
        error: (e) => console.log(e),
        complete: () => {
          console.log(this.team), (this.gettingTeams = false);
        },
      });
  }
  goback() {
    console.log('vvv');

    this.location.back();
  }
}
