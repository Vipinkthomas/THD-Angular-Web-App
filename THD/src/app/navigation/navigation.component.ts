import { NavigationService } from './../navigation.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navigation:any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(private _navigationService:NavigationService,private router:Router) { }

  ngOnInit(): void {

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
