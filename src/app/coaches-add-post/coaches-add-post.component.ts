import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-coaches-add-post',
  templateUrl: './coaches-add-post.component.html',
  styleUrls: ['./coaches-add-post.component.css'],
})
export class CoachesAddPostComponent implements OnInit {
  constructor() {}

  addProblem() {
    this.problems.push('new problem');
  }
  addStudent(item :string) {
    if (this.students.indexOf(item)==-1) {

      this.students.push(item);
    }
  }
  ngOnInit(): void {}
  problems: String[] = [];
  students: String[] = [];
}
