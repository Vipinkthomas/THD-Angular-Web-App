import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = "https://thabella.th-deg.de/thabella/opn/period/findByRoom/146/2020-11-24%208:00";

  constructor(private httpClient: HttpClient) { }

  sendGetRequest(url) {
    return this.httpClient.get<Event>(url); // this.apiUrl
  }

  /*
  sendPostRequest(data: Object): Observable<Object> {
    return this.httpClient.post(this.apiUrl, data);
  }
  */
}

