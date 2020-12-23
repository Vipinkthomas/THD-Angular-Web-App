import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  data={"access":"public"}
  isCreateButton=false;
  isUpdateButton=false;
  createEventForm: FormGroup;
  updateEventForm: FormGroup;
  deleteEventForm: FormGroup;
  events=[]
  CreateEvent={
    "event_name": "",
    "event_desc": "",
    "event_date": "",
    "access": "public",
    "imageURL": "image",
    "iconName": "icon"

  };
  UpdateFullEvent={
    "_id":"",
  "UpdateEvent": {
    "_id":"",
    "event_name": "",
    "event_desc": "",
    "event_date": "",
    "access": "public",
    "imageURL": "image",
    "iconName": "icon"

  }
};

  DeleteEvent={
    "_id":""
  };
  constructor(private _eventService:EventService,private router:Router,private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.createEventForm = this.formBuilder.group({
      eventname: ['', Validators.required],
      eventdesc: ['', Validators.required],
      eventdate: ['', Validators.required]
    });

    this.updateEventForm = this.formBuilder.group({
      eventname: ['', Validators.required],
      eventdesc: ['', Validators.required],
      eventdate: ['', Validators.required]
    });

    this.deleteEventForm = this.formBuilder.group({
      eventname: ['', Validators.required],
      eventdate: ['', Validators.required]
    });

    this._eventService.getEvents(this.data)
    .subscribe(res=>this.events=res,
      err=>{
        console.log(err)
        if (err instanceof HttpErrorResponse){
          if(err.status===401){
            this.router.navigate(['/login'])
          }
        }
      
      })
  }

  createEvent(){

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

  }
  updateEvent(){
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
  }
  deleteEvent(data: any){
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
    this.UpdateFullEvent._id=data;
    this.UpdateFullEvent.UpdateEvent._id=data;
    console.log(this.UpdateFullEvent._id);
  }


}
