import { EventService } from '../service/event.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  myControl = new FormControl();
  data={"access":"public"}
  isCreateButton=false;
  isUpdateButton=false;
  createEventForm: FormGroup;
  updateEventForm: FormGroup;
  deleteEventForm: FormGroup;
  events=[]
  temp_events=[]
  lang_sel:any;
  options: any[]=['All events']
  filteredOptions: Observable<string[]>;

  CreateEvent={
    "event_name_en": "",
    "event_name_de": "",
    "event_desc_en": "",
    "event_desc_de": "",
    "event_date": "",
    "access": "public",
    "imageURL": "image",
    "iconName": "icon",
    "createdby": ""

  };
  UpdateFullEvent={
    "_id":"",
  "UpdateEvent": {
    "_id":"",
    "event_name_en": "",
    "event_name_de": "",
    "event_date": "",
    "access": "public",
    "imageURL": "image",
    "iconName": "icon",
    "createdby": "",
    "event_desc_en": "",
    "event_desc_de": ""

  }
};

  DeleteEvent={
    "_id":""
  };
  constructor(private _eventService:EventService,private router:Router,private formBuilder: FormBuilder,public translate: TranslateService) { }
  
  ngOnInit(): void {


    this.lang_sel=(localStorage.getItem('lang')=='en') ? true:false;

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
    .subscribe(
      res=>{
        this.events=res;
        this.temp_events=this.events;
        console.log(res);
        for (var index1 in this.events) {
          this.options.push(this.events[index1].event_name_en)
          console.log(this.events[index1].event_name_en)
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

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
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

    if(this.events[i].event_name_en.toLowerCase().includes(filterValue.toLowerCase()))   
    {
      this.temp_events.push(this.events[i])
      

    }
    

      }
    }
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);  
    
  }


}
