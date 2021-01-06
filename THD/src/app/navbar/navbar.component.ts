import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../models/menuitems';
/**
 * set width Breakpoint
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      label: 'Room',
      link: '/rooms'
    }
  ];

  constructor(public _authService:AuthService) { }

  ngOnInit(): void {
    
  }

}
