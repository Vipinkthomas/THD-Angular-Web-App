import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationService } from '../service/navigation.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userName = "";
  userrole = "";
  navigation:any;
  private first=true;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  constructor(private authService: AuthService, private router: Router,private _navigationService:NavigationService) { }

  ngOnInit(): void {

    this.userName = sessionStorage.getItem('name');
    this.userrole = sessionStorage.getItem('role');
    // sessionStorage.removeItem('role')
    // sessionStorage.removeItem('name')
    this._navigationService.getNavigation({})
    .subscribe(res=>this.navigation=res,
      err=>{
        console.log(err)
        if (err instanceof HttpErrorResponse){
          if(err.status===401){
            this.router.navigate(['/login'])
          }
        }
      
      })
   
  }

  
}

