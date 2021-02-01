import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
/**
 * set width Breakpoint
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public _authService:AuthService) { }

  ngOnInit(): void {
    
  }

}
