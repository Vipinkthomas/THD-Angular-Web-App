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
      icon: 'home',
      link: '/'
    },
    {
      label: 'News',
      icon: 'info',
      link: '/news'
    },
    {
      label: 'Events',
      icon: 'event_note',
      link: '/event'
    },
    {
      label: 'Navigate',
      icon: 'directions_walk',
      link: '/navigation'
    },
    {
      label: 'Room',
      icon: 'login',
      link: '/rooms'
    },
    {
      label: 'Register',
      icon: 'person_add',
      link: '/register'
    },
    {
      label: 'Login',
      icon: 'login',
      link: '/login'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    
  }

}