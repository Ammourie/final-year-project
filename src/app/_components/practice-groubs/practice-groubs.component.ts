import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-practice-groubs',
  templateUrl: './practice-groubs.component.html',
  styleUrls: ['./practice-groubs.component.css']
})
export class PracticeGroubsComponent implements OnInit {

  displayModal: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showModalDialog() {
    this.displayModal = true;
  }
}
