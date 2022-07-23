import { AccountService } from './account.service';
import { Stats } from './../_models/stats';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  stats: Stats | undefined;
  gettingStats = false;
  baseUrl = 'https://cpcmanager.herokuapp.com/api/';

  constructor(private http: HttpClient, private account: AccountService) {}

  getStats() {
    this.gettingStats = true;
    const token = this.account.getMyToken();

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
    this.http.get<Stats>(this.baseUrl + 'Users/stats', header).subscribe({
      next: (res) => {
        this.stats = res;
        this.stats.percentageOfFemaleUsers=this.stats.percentageOfFemaleUsers*100
        this.stats.percentageOfMaleUsers=this.stats.percentageOfMaleUsers*100
        this.stats.percentageOfNewParticipants=this.stats.percentageOfNewParticipants*100
        console.log(this.stats);

      },
      error: (error) => console.log(error),
      complete: () => {
        this.gettingStats = false;
      },
    });
  }
}
