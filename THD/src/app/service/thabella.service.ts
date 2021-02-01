import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * thabella api calls
 */
@Injectable({
  providedIn: 'root'
})

export class EventService {

/**
  * thabella api url
  */
  private eventUrl="http://localhost:3000/apiajax/thabella"


/**
 * constructor
 */
  constructor(private _http:HttpClient) { }

  /**
  * @example
  * to get thabella event info
  * getThabella(data)
  *
  * @param {string} data room,date and time{@link Todo}
  * @returns response from server
  */
  getThabella(data){
    return this._http.post<any>(this.eventUrl,data)
  }
}
