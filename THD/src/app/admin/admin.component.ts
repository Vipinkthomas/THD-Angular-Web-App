import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userName = "";
  userrole = "";

  private first=true;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.userName = sessionStorage.getItem('name');
    this.userrole = sessionStorage.getItem('role');
    // sessionStorage.removeItem('role')
    // sessionStorage.removeItem('name')
    
  }

  
}

