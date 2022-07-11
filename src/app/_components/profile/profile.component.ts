import { Participation } from './../../_models/participation';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Student } from './../../_models/student';
import { Component, OnInit } from '@angular/core';
import { VERSION, ViewChild, ElementRef } from '@angular/core';

import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  editingNamePart: boolean = false;
  editingBioPart: boolean = false;
  showDialogModalFlag: boolean = false;
  showPDialogModalFlag: boolean = false;
  showDDialogModalFlag: boolean = false;
  indexForDelete: number = 0;
  dialogeTitle: string = '';
  dialogeType: string = '';
  student: Student | undefined;
  // codeforces: any = { handle: null};
  dialogeValue: String = '';
  imgUrl: any;
  username = JSON.parse(localStorage.getItem('user')!!).username;
  token = JSON.parse(localStorage.getItem('user')!!).token;
  x = JSON.stringify(this.jwtHelper.decodeToken(this.token));
  x2 = JSON.parse(this.x);
  loggedinId = this.x2.nameid;
  loading = true;
  model1: any = { bio: null, fullName: null, university: null };
  participation: Participation = {
    rank: '',
    year: '',
    name: '',
    location: '',
    teamName: '',
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private jwtHelper: JwtHelperService
  ) {}
  // constructor(private http: HttpClient) {
  //   const username = JSON.parse(localStorage.getItem('user')!!).username;
  //   const auth= JSON.parse(localStorage.getItem('user')!!).token

  //   var header = {
  //     headers: new HttpHeaders()
  //    . set('Authorization',  `Bearer ${auth}`)
  //   }

  //   http
  //     .get<Student>('https://cpcmanager.herokuapp.com/api/Users/' + username,header)
  //     .subscribe({
  //       next: (r) => this.student=r,
  //       complete:()=>console.log("ccc")

  //     });
  // }

  goback() {
    this.location.back();
  }
  ngOnInit(): void {
    const username =
      this.router.url.split('/')[this.router.url.split('/').length - 1];

    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http
      .get<Student>(
        'https://cpcmanager.herokuapp.com/api/Users/' + username,
        header
      )
      .subscribe({
        next: (r) => {
          this.student = r;
          this.model1 = r;
        },
        error: (error) => {
          if (error.status == 404) {
            this.router.navigateByUrl('/notfound');
          }
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
  onSelectFile(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();

      const auth = JSON.parse(localStorage.getItem('user')!!).token;
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${auth}`,
        }),
      };
      formData.append('file', file);

      const upload$ = this.http.post(
        'https://cpcmanager.herokuapp.com/api/Users/add-photo',

        formData,
        httpOptions
      );

      upload$.subscribe({
        next: (res) => console.log(res),

        error: (e) => console.log(e),

        complete: () => window.location.reload(),
      });
    }
    // if (event.target.files && event.target.files[0]) {
    //   var reader = new FileReader();

    //   reader.readAsDataURL(event.target.files[0]); // read file as data url

    //   reader.onload = (event) => {
    //     // called once readAsDataURL is completed
    //     this.imgUrl = event.target?.result;
    //   };
    // }
  }
  toogleEditingNamePart() {
    this.editingNamePart = true;
  }
  editNamePart() {
    this.editingNamePart = false;
    const auth = JSON.parse(localStorage.getItem('user')!!).token;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${auth}`,
      }),
    };
    this.http
      .patch(
        'https://cpcmanager.herokuapp.com/api/Users',
        this.model1,
        httpOptions
      )
      .subscribe({
        error: (e) => console.log(e),
        complete: () => {
          this.dialogeValue = '';
          this.showDialogModalFlag = false;
        },
      });
  }
  toogleBioPart() {
    this.editingBioPart = true;
  }
  editBioPart() {
    this.editingBioPart = false;
  }
  showDialogModal(type: string) {
    if (type == 'codeforces') {
      this.dialogeTitle = 'أدخل اسم المستخدم الخاص بك على codeforces:';
    } else if (type == 'atcoder') {
      this.dialogeTitle = 'أدخل اسم المستخدم الخاص بك على atCoder:';
    } else if (type == 'codechef') {
      this.dialogeTitle = 'أدخل اسم المستخدم الخاص بك على codechef:';
    }
    this.dialogeType = type;
    this.showDialogModalFlag = true;
  }
  submitDialoge() {
    if (this.dialogeType == 'codeforces') {
      const auth = JSON.parse(localStorage.getItem('user')!!).token;
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${auth}`,
        }),
      };
      this.http
        .post(
          'https://cpcmanager.herokuapp.com/api/Users/codeforces-account/' +
            this.dialogeValue,
          {},
          httpOptions
        )
        .subscribe({
          error: (e) => console.log(e),
          complete: () => {
            this.dialogeValue = '';
            this.showDialogModalFlag = false;
            window.location.reload();
          },
        });
    }
  }
  addParticibation() {
    console.log(this.participation);
    this.student?.participations.push(this.participation);
    this.participation = {
      rank: '',
      year: '',
      name: '',
      location: '',
      teamName: '',
    };
    this.showPDialogModalFlag = false;
  }
  deleteParticipation(id: number) {
    this.showDDialogModalFlag = true;
    this.indexForDelete = id;
  }
  confirmDelete() {
    this.showDDialogModalFlag = false;
    this.student?.participations.splice(this.indexForDelete,1)
  }
}
