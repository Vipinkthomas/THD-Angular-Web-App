import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../menuitems';
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
      label: 'Home',
      link: '/'
    },
    {
      label: 'News',
      link: '/news'
    },
    {
      label: 'Events',
      link: '/event'
    },
    {
      label: 'Navigate',
      link: '/navigation'
    },
    {
      label: 'Room',
      link: '/rooms'
    }
  ];

  constructor(public _authService:AuthService) { }

  ngOnInit(): void {
    
  }

}
