import { Student } from './../_models/student';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchedStudents: Student[] = [];
  searchedCoaches: Student[] = [];
  constructor(private http: HttpClient) {}
  coachesSearch() {}
  studentsSearch() {}
}
