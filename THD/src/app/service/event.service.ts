import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Event service for for creating/getting/updating/deleting events
 * to extract public events for guest users
 */
@Injectable({
  providedIn: 'root'
})

export class EventService {

  /**
  * api urls for event-get
  */
  private eventUrl="http://localhost:3000/api/events"

  /**
  * api urls for public events
  */
  private publicEventUrl="http://localhost:3000/api/publicevents"

  /**
  * api urls for creating events
  */
  private createEventUrl="http://localhost:3000/api/addevents"

  /**
  * api urls for uodate news
  */
  private updateEventUrl="http://localhost:3000/api/updateevents"

  /**
  * api urls for delete news
  */
  private deleteEventUrl="http://localhost:3000/api/deleteevents"


  /**
  * constructor
  */
  constructor(private _http:HttpClient) { }

  /**
  * @example
  * to get events {both public and protected}
  * getEvents(data)
  *
  * @param {JSON} data  access details info{@link Todo}
  * @returns response from server
  */
  getEvents(data){
    return this._http.get<any>(this.eventUrl,data)
  }

  /**
  * @example
  * to get public events alone
  * getPublicEvents()
  *
  * @param {} null
  * @returns response from server
  */
  getPublicEvents(){
    return this._http.get<any>(this.publicEventUrl)
  }

  /**
  * @example
  * to create new events
  * createEvents(data)
  *
  * @param {JSON} data  new event info{@link Todo}
  * @returns response from server
  */
  createEvents(data){
    return this._http.post<any>(this.createEventUrl,data)
  }

  /**
  * @example
  * to update existing events
  * updateEvents(data)
  *
  * @param {JSON} data  updated event info{@link Todo}
  * @returns response from server
  */
  updateEvents(data){
    return this._http.post<any>(this.updateEventUrl,data)
  }

  /**
  * @example
  * to delete event
  * deleteEvents(data)
  *
  * @param {JSON} data  delete event info{@link Todo}
  * @returns response from server
  */
  deleteEvents(data){
    return this._http.post<any>(this.deleteEventUrl,data)
  }
}
