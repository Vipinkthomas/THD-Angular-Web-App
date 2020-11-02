import { CourseService } from '../course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  
  public courses:string[];
  constructor(service:CourseService) { 
    this.courses=service.courses;
  }

  ngOnInit(): void {
  }

}
