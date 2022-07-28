import { Participation } from './../../_models/participation';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../_models/user';
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
  student: User | undefined;
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
    id: 0,
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private jwtHelper: JwtHelperService
  ) {}

  goback() {
    this.location.back();
  }
  ngOnInit(): void {
    const id =
    this.router.url.split('/')[this.router.url.split('/').length - 1];
    this.getUser(id);
  }
  getUser(id:any) {


    const auth = JSON.parse(localStorage.getItem('user')!!).token;

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${auth}`),
    };

    this.http
      .get<User>('https://cpcmanager.herokuapp.com/api/Users/' + id, header)
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
        next: (res) => {},

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
    this.editNamePart();
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
    } else if (this.dialogeType == 'codechef') {
      const auth = JSON.parse(localStorage.getItem('user')!!).token;
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${auth}`,
        }),
      };
      this.http
        .patch(
          'https://cpcmanager.herokuapp.com/api/Users',
          { codeChefHandle: this.dialogeValue },
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
    } else {
      const auth = JSON.parse(localStorage.getItem('user')!!).token;
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${auth}`,
        }),
      };
      this.http
        .patch(
          'https://cpcmanager.herokuapp.com/api/Users',
          { atCoderHandle: this.dialogeValue },
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

    const auth = JSON.parse(localStorage.getItem('user')!!).token;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${auth}`,
      }),
    };
    this.http
      .post(
        'https://cpcmanager.herokuapp.com/api/Participations',
        this.participation,
        httpOptions
      )
      .subscribe({
        error: (e) => console.log(e),
        complete: () => {
          this.student?.participations.push(this.participation);

          this.participation = {
            rank: '',
            year: '',
            name: '',
            location: '',
            teamName: '',
            id: 0,
          };
          this.showPDialogModalFlag = false;
        },
      });
  }
  deleteParticipation(id: number) {
    this.showDDialogModalFlag = true;
    this.indexForDelete = id;
  }
  confirmDelete() {
    const auth = JSON.parse(localStorage.getItem('user')!!).token;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${auth}`,
      }),
    };
    this.http
      .delete(
        'https://cpcmanager.herokuapp.com/api/Participations/' +
          this.student?.participations[this.indexForDelete].id,
        httpOptions
      )
      .subscribe({
        error: (e) => console.log(e),
        complete: () => {
          this.showDDialogModalFlag = false;
          this.student?.participations.splice(this.indexForDelete, 1);
        },
      });
  }
}
