import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private eventUrl="http://localhost:3000/api/events"
  private createEventUrl="http://localhost:3000/api/addevents"
  private updateEventUrl="http://localhost:3000/api/updateevents"
  private deleteEventUrl="http://localhost:3000/api/deleteevents"

  constructor(private _http:HttpClient) { }

  getEvents(data){
    return this._http.post<any>(this.eventUrl,data)
  }

  createEvents(data){
    return this._http.post<any>(this.createEventUrl,data)
  }
  updateEvents(data){
    return this._http.post<any>(this.updateEventUrl,data)
  }

  deleteEvents(data){
    return this._http.post<any>(this.deleteEventUrl,data)
  }
}
