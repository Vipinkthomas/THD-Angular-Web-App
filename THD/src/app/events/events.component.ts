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
  constructor(private _eventService:EventService,private router:Router,private formBuilder: FormBuilder) { }
  CreateEvent={
    eventName: '',
    eventDesc:'',
    eventDate:'',
    access:'public',
    imageURL:'image',
    iconName:'icon'

  };
  UpdateEvent={
    eventName: '',
    eventDesc:'',
    eventDate:'',
    access:'public',
    imageURL:'image',
    iconName:'icon'

  };

  DeleteEvent={
    eventName: '',
    eventDate:''

  };
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

    (){
    console.log('running'+this.createEventForm.get('eventname')+this.createEventForm.get('eventdesc')+this.createEventForm.get('eventdate'))
  }
  updateEvent(){
    console.log('running'+this.createEventForm.get('eventname')+this.createEventForm.get('eventdesc')+this.createEventForm.get('eventdate'))
  }
  deleteEvent(){
    console.log('running'+this.deleteEventForm.get('eventname')+this.deleteEventForm.get('eventdate'))
  }

}
