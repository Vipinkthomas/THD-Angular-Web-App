import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private jwtService: JwtService, private router: Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('access_token').split(";")[0];
  }

  userName = "";

  logout() {
    this.jwtService.logout();
    this.router.navigateByUrl('/login');
  }
}

