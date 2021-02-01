import { EventService } from '../service/event.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Event service for for creating/getting/updating/deleting events
 * to extract public events for guest users
 */
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  /**
  * variables
  */
  myControl = new FormControl();
  data={"access":"public"}
  isCreateButton=false;
  isUpdateButton=false;
  createEventForm: FormGroup;
  updateEventForm: FormGroup;
  deleteEventForm: FormGroup;
  events:any;
  temp_events=[]
  lang_sel:any;
  options: any[]=['All events']
  filteredOptions: Observable<string[]>;

  /**
  * models
  */
  CreateEvent={
    "event_name_en": "",
    "event_name_de": "",
    "event_desc_en": "",
    "event_desc_de": "",
    "event_date": "",
    "access": "public",
    "imageURL": "image",
    "iconName": "icon",
    "createdby": "",
    "numLike":0,
    "numDisLike":0


  };
  UpdateFullEvent={
    "_id":"",
  "UpdateEvent": {
    "_id":"",
    "event_name_en": "",
    "event_name_de": "",
    "event_date": "",
    "access": "",
    "imageURL": "",
    "iconName": "",
    "createdby": "",
    "event_desc_en": "",
    "event_desc_de": "",
    "numLike":0,
    "numDisLike":0

  }
};

  DeleteEvent={
    "_id":""
  };

  /**
  * constructor
  */
  constructor(private _snackBar:MatSnackBar,private _eventService:EventService,private router:Router,private formBuilder: FormBuilder,public translate: TranslateService) { }
  
  /**
  * Component Initialisation executed after constructor
  */
  ngOnInit(): void {


    this.lang_sel=(localStorage.getItem('lang')=='en') ? true:false;

    this.createEventForm = this.formBuilder.group({
      eventname_en: ['', Validators.required],
      eventdesc_en: ['', Validators.required],
      eventname_de: ['', Validators.required],
      eventdesc_de: ['', Validators.required],
      eventdate: ['', Validators.required],
      access: ['', Validators.required],
      imageURL: ['', Validators.required],
      iconName: ['', Validators.required],
      createdby: ['', Validators.required]
    });

    this.updateEventForm = this.formBuilder.group({
      eventname_en: ['', Validators.required],
      eventdesc_en: ['', Validators.required],
      eventname_de: ['', Validators.required],
      eventdesc_de: ['', Validators.required],
      eventdate: ['', Validators.required],
      access: ['', Validators.required],
      imageURL: ['', Validators.required],
      iconName: ['', Validators.required],
      createdby: ['', Validators.required]
    });


      this.eventLoad()

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith('All Events'),
        map(value => this._filter(value))
      );
  }


  /**
  * @example
  * to create new events
  * createEvents(data)
  *
  * @param {JSON} data  new event info{@link Todo}
  * @returns response from server
  */
  createEvent(action:any,name:any){

    // console.log('running'+this.createEventForm.controls['eventname'].value+this.createEventForm.controls['eventdesc'].value+this.createEventForm.controls['eventdate'].value)
    this._eventService.createEvents(this.CreateEvent)
    .subscribe(res=>this.events=res,
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
      this.eventLoad()

  }

  /**
  * @example
  * to update existing events
  * updateEvents(data)
  *
  * @param {JSON} data  updated event info{@link Todo}
  * @returns response from server
  */
  updateEvent(action:any,name:any){
    this._eventService.updateEvents(this.UpdateFullEvent)
    .subscribe(res=>this.events=res,
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
      this.eventLoad()
  }

  /**
  * @example
  * to delete event
  * deleteEvents(data)
  *
  * @param {JSON} data  delete event info{@link Todo}
  * @returns response from server
  */
  deleteEvent(data: any,action:any,name:any){
    this.DeleteEvent._id=data;
    this._eventService.deleteEvents(this.DeleteEvent)
    .subscribe(res=>this.events=res,
      err=>{
        console.log(err)
        if (err instanceof HttpErrorResponse){
          if(err.status===401){
            this.router.navigate(['/login'])
          }
        }
      
      })
      
      this.snackBar(action,name)
      this.eventLoad()
  }

  /**
    * to open or close create and update form
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
    * to open or close create and update form
    * and update the form with selected event info
    */
  isUpdate(data: any){
    if(this.isUpdateButton){
      this.isUpdateButton=false;
    } 
    else{
      this.isUpdateButton=true;
      this.isCreateButton=false;
    }
    this.UpdateFullEvent._id=data;
    this.UpdateFullEvent.UpdateEvent._id=data;
    for (var index1 in this.events) {
      if(this.events[index1]._id==data)
      {
        this.UpdateFullEvent.UpdateEvent.access=this.events[index1].access
        this.UpdateFullEvent.UpdateEvent.event_date=this.events[index1].event_date
        this.UpdateFullEvent.UpdateEvent.event_desc_de=this.events[index1].event_desc_de
        this.UpdateFullEvent.UpdateEvent.event_desc_en=this.events[index1].event_desc_en
        this.UpdateFullEvent.UpdateEvent.event_name_en=this.events[index1].event_name_en
        this.UpdateFullEvent.UpdateEvent.event_name_de=this.events[index1].event_name_de
        this.UpdateFullEvent.UpdateEvent.iconName=this.events[index1].iconName
        this.UpdateFullEvent.UpdateEvent.createdby=this.events[index1].createdby
        this.UpdateFullEvent.UpdateEvent.imageURL=this.events[index1].imageURL
        this.UpdateFullEvent.UpdateEvent.numLike=this.events[index1].numLike
        this.UpdateFullEvent.UpdateEvent.numDisLike=this.events[index1].numDisLike
        break;
      }
    }
  }

  /**
  * @example
  * Search bar options " All Events" and update temp events arrays with respect to the search word
  * _filter(value: string)
  * @returns {string} options
  */ 
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.temp_events=[]
    if(filterValue.toLowerCase()=="all events")
    {
      this.temp_events=this.events;
    }
    else
    {
    for(var i=0;i<this.events.length;i++){

    if(this.events[i].event_name_en.toLowerCase().includes(filterValue.toLowerCase())||this.events[i].event_name_de.toLowerCase().includes(filterValue.toLowerCase()))   
    {
      this.temp_events.push(this.events[i])
    }
      }
    }
      return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);  
    
  }

  /**
  * @example
  * to get events {both public and protected}
  * getEvents(data)
  *
  * @param {JSON} data  access details info{@link Todo}
  * @returns response from server
  */
  eventLoad(){
    this.lang_sel=(localStorage.getItem('lang')=='en') ? true:false;
    this._eventService.getEvents(this.data)
    .subscribe(
      res=>{
        this.events=res;
        this.temp_events=this.events;
        for (var index1 in this.events) {
          if(this.lang_sel){
          this.options.push(this.events[index1].event_name_en)
          console.log(this.options)
          }
          else{
          this.options.push(this.events[index1].event_name_de)
          console.log(this.options)
          }
        }
      },
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
  * snackbar for update and delete
  */
  snackBar(action:any,name:any){
    this._snackBar.open(action,name, {
      duration: 2000,
    });
  }

}
