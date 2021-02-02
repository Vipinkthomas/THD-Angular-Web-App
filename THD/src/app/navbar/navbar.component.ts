import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
/**
 * navigation bar component for responsiveness and menu
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

/**
 * navbar class
 */
export class NavbarComponent implements OnInit {

  /**
 * constructor
 */
  constructor(public _authService:AuthService) { }

/**
 * run afte the constructor
 */
  ngOnInit(): void {
    
  }

}
