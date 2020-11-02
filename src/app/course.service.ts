import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _courses=['course1','course2','course3'];

  get courses(){
    return this._courses
  }

  constructor() { }
}
