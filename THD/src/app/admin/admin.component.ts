import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Admin/Registered User profile Component
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  /**
  * variables
  */
  userName = "";
  userrole = "";

  private first=true;

  /**
  * constructor
  */
  constructor(private authService: AuthService, private router: Router) { }

  /**
  * Component Initialisation executed after constructor
  */
  ngOnInit(): void {

  /**
  * getting info from sessionStorage
  */
    this.userName = sessionStorage.getItem('name');
    this.userrole = sessionStorage.getItem('role');
    // sessionStorage.removeItem('role')
    // sessionStorage.removeItem('name')
    
  }

  
}

