import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit(): void {
  }
  goback() {
    console.log("vvv");

    this.location.back();
  }
}
