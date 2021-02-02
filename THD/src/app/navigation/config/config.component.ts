import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icon } from 'leaflet';
import { NavigationService } from 'src/app/service/navigation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

/**
  * navigation pointers component - for creating,deleting, updating navigaiton points or buildings(here)
  */
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})

/**
  * navigation pointers class - for creating,deleting, updating navigaiton points or buildings(here)
  */
export class ConfigComponent implements OnInit {
  
  /**
  * variables
  */
  navigation:any;
  nav:any;
  private first=true;
  isCreateButton=false;
  isUpdateButton=false;
  createNavForm: FormGroup;
  updateNavForm: FormGroup;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  /**
  * models -json object for data retrieval
  */
  CreateNav={
    "building_name": "",
    "lattitude": "",
    "longitude": "",
    "iconName": ""
  };

  /**
  * models -json object for data retrieval
  */
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

/**
  * models -json object for data retrieval
  */
  DeleteNav={
    "_id":""
  };

  /**
  * constructor
  */
  constructor(private _snackBar:MatSnackBar,private _navigationService:NavigationService,private router: Router,private formBuilder: FormBuilder) { }

  /**
  * run after constructor
  */
  ngOnInit(): void {

  /**
  * validation form
  */
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

  /**
  * loading table with DB data
  */
    this.tableLoad()
   
  }


 /**
  * function for loading navigation points from DB
  * @example
  * to get navigations points
  * getNavigation()
  *
  * @param {} null
  * @returns response from server
  */
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

  /**
  * @example
  * to create new points
  * createNavigation(data)
  *
  * @param {JSON} data  new navigation point info{@link Todo}
  * @returns response from server
  */
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

  /**
  * @example
  * to delete navigation point
  * deleteNavigation(data)
  *
  * @param {JSON} data  delete pointer info{@link Todo}
  * @returns response from server
  */
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

  /**
  * @example
  * to update an existing map pointer
  * updateNavigation(data)
  *
  * @param {JSON} data  updated navigation point info{@link Todo}
  * @returns response from server
  */
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

  /**
  * flag setter
  */ 
  isCreate(){
    if(this.isCreateButton){
      this.isCreateButton=false;
    } 
    else{
      this.isCreateButton=true;
      this.isUpdateButton=false;
    }
  }

/**
  * flag setter and load details for update form
  */
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
  
  /**
  * adding the details to the form
  */
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

  /**
  * snackbar for notification
  */
  snackBar(action:any,name:any){
    this._snackBar.open(action,name, {
      duration: 2000,
    });
  }

}
