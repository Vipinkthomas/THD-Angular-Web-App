import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private eventUrl="http://localhost:3000/apiajax/thabella"

  constructor(private _http:HttpClient) { }

  getThabella(data){
    return this._http.post<any>(this.eventUrl,data)
  }
}
