import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icon } from 'leaflet';
import { NavigationService } from 'src/app/service/navigation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})


export class ConfigComponent implements OnInit {
  navigation:any;
  nav:any;
  private first=true;
  isCreateButton=false;
  isUpdateButton=false;
  createNavForm: FormGroup;
  updateNavForm: FormGroup;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  CreateNav={
    "building_name": "",
    "lattitude": "",
    "longitude": "",
    "iconName": ""
  };
  UpdateFullNav={
    "_id":"",
  "UpdateNav": {
    "_id":"",
    "building_name": "",
    "lattitude": "",
    "longitude": "",
    "iconName": ""
  }
};
  DeleteNav={
    "_id":""
  };
  constructor(private _snackBar:MatSnackBar,private _navigationService:NavigationService,private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createNavForm = this.formBuilder.group({
      buildingname: ['', Validators.required],
      lattitude: ['', Validators.required],
      longitude: ['', Validators.required],
      iconname: ['', Validators.required],
    });

    this.updateNavForm = this.formBuilder.group({
      buildingname: ['', Validators.required],
      lattitude: ['', Validators.required],
      longitude: ['', Validators.required],
      iconname: ['', Validators.required],
    });

    this.tableLoad()
   
  }

  tableLoad(){
    this._navigationService.getNavigation()
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

  createNav(action:any,name:any){

    // console.log('running'+this.createEventForm.controls['eventname'].value+this.createEventForm.controls['eventdesc'].value+this.createEventForm.controls['eventdate'].value)
    this._navigationService.createNavigation(this.CreateNav)
    .subscribe(res=>this.nav=res,
      err=>{
        console.log(err)
        if (err instanceof HttpErrorResponse){
          if(err.status===401){
            this.router.navigate(['/login'])
          }
        }
      
      })
      this.snackBar(action,name)
      this.isCreateButton=false;
      this.tableLoad()

  }
  deleteNav(data: any,action:any,name:any){
    this.DeleteNav._id=data;
    this._navigationService.deleteNavigation(this.DeleteNav)
    .subscribe(res=>this.nav=res,
      err=>{
        console.log(err)
        if (err instanceof HttpErrorResponse){
          if(err.status===401){
            this.router.navigate(['/login'])
          }
        }
      
      })
      
      this.snackBar(action,name)
      this.tableLoad()

  }

  updateNav(action:any,name:any){
    this._navigationService.updateNavigation(this.UpdateFullNav)
    .subscribe(res=>this.nav=res,
      err=>{
        console.log(err)
        if (err instanceof HttpErrorResponse){
          if(err.status===401){
            this.router.navigate(['/login'])
          }
        }
      
      })
      this.snackBar(action,name)
      this.isUpdateButton=false;
      this.tableLoad()
    
  }
  isCreate(){
    if(this.isCreateButton){
      this.isCreateButton=false;
    } 
    else{
      this.isCreateButton=true;
      this.isUpdateButton=false;
    }
  }

  isUpdate(data: any){
    if(this.isUpdateButton){
      this.isUpdateButton=false;
    } 
    else{
      this.isUpdateButton=true;
      this.isCreateButton=false;
    }
    this.UpdateFullNav._id=data;
    this.UpdateFullNav.UpdateNav._id=data;
    for (var index1 in this.navigation) {
      if(this.navigation[index1]._id==data)
      {
        this.UpdateFullNav.UpdateNav.building_name=this.navigation[index1].building_name
        console.log(this.UpdateFullNav.UpdateNav.building_name)
        this.UpdateFullNav.UpdateNav.lattitude=this.navigation[index1].lattitude
        this.UpdateFullNav.UpdateNav.longitude=this.navigation[index1].longitude
        this.UpdateFullNav.UpdateNav.iconName=this.navigation[index1].iconName
        break;
      }
    }
  }

  snackBar(action:any,name:any){
    this._snackBar.open(action,name, {
      duration: 2000,
    });
  }

}
