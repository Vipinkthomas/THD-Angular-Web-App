import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private eventUrl="http://localhost:3000/api/events"

  constructor(private _http:HttpClient) { }

  getEvents(data){
    return this._http.post<any>(this.eventUrl,data)
  }
}
