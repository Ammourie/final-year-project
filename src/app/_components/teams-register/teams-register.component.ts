import { AccountService } from 'src/app/_services/account.service';
import { SearchService } from './../../_services/search.service';
import { TeamsService } from './../../_services/teams.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../_models/user';
import { Router } from '@angular/router';
import { UsersService } from '../../_services/users.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teams-register',
  templateUrl: './teams-register.component.html',
  styleUrls: ['./teams-register.component.css'],
})
export class TeamsRegisterComponent implements OnInit {
  students: User[] = [];
  searchString = '';
  searchFlag = false;
  selectedCoach: User | undefined;
  team: any = {
    name: '',
    members: [],
    coachId: 0,
  };
  responsiveOptions;

  constructor(
    private primengConfig: PrimeNGConfig,
    public studentService: UsersService,
    private router: Router,
    private location: Location,
    private httpclient: HttpClient,
    public teamsService: TeamsService,
    public searchService: SearchService,
    public accountService: AccountService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1350px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '760px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit() {
    this.studentService.getMyUser();

    this.teamsService.getMyUser().subscribe({
      next: (r) => {
        if(!r.isCoach)
        this.addStudent(r);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
    if (this.studentService.students.length == 0) {
      this.teamsService.getUnteamedRecommendedStudents();

      this.studentService.getcoaches(1, 100);
      this.selectedCoach = this.studentService.coaches[0];
    }

    this.primengConfig.ripple = true;
  }

  goback() {
    this.location.back();
  }
  gotoProfile(student: User) {
    this.router.navigateByUrl('/profile/' + student.id);
  }
  addStudent(student: User) {
    if (!this.students.includes(student)) {
      if (this.students.length < 3) this.students.push(student);
    }
  }
  deleteStudent(element: number) {
    this.students.forEach((value, index) => {
      if (element == index) {
        this.students.splice(index, 1);
      }
    });
  }
  displayModal: boolean = false;

  showModalDialog() {
    console.log(this.studentService);
    this.displayModal = true;
  }

  registerGroup() {
    for (const i of this.students) {
      this.team.members.push(i.id);
    }
    this.team.coachId = this.selectedCoach?.id;
    console.log(this.team);

    const auth = JSON.parse(localStorage.getItem('user')!!).token;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${auth}`,
      }),
    };

    this.httpclient
      .post(
        'https://cpcmanager.herokuapp.com/api/Teams',
        this.team,
        httpOptions
      )
      .subscribe({
        next: (e) => {},
        error: (e) => {},
        complete: () => {
          this.displayModal = false;
          this.students = [];
          this.router.navigateByUrl('/teams');
        },
      });
  }
  searchForStudent() {
    if (this.searchString == '') {
      this.searchFlag = false;
    } else {
      this.searchFlag = true;
    }

    this.searchService.studentsSearch(this.searchString).subscribe({
      next: (res: any) => {
        this.teamsService.students = [];
        res.forEach((element: any) => {
          if (!element.isCoach && element.teams.length == 0)
            this.teamsService.students.push(element);
        });
      },
      error: (error: any) => console.log(error),
      complete: () => {
        this.searchService.gettingSearchedStudents = false;
      },
    });
  }
  onPageChange(page: any) {
    if (this.teamsService.studentsCurrentPage != page.page + 1) {
      this.teamsService.getUnteamedStudents(page.page + 1);
    }
  }
}
