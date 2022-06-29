import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}
  goback() {
    console.log('vvv');

    this.location.back();
  }
}
