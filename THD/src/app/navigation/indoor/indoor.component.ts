import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
  selector: 'app-indoor',
  templateUrl: './indoor.component.html',
  styleUrls: ['./indoor.component.scss']
})
export class IndoorComponent implements OnInit {
  
  navigation:any;
  private first=true;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
  constructor(private _navigationService:NavigationService,private router: Router) { }

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
