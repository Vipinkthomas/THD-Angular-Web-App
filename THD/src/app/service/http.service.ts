import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Room service class
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  /**
   * endpoint url for events
   */
  private eventsUrl = "http://localhost:3000/api/thabellaevents"


  /**
   * a constructor to create new instance of this class
   * @param http 
   */
  constructor(private http: HttpClient) { }

  /**
   * This function send GET request to the endpoint API in the backend server and it returns a JSON object 
   * with the event info in a specific room
   * @param roomIdSelected
   * @param dateSelected 
   * @param hourSelected 
   */
  getEventInfo(roomIdSelected: string, dateSelected: string, hourSelected: string){
    
    return this.http.get<any>(this.eventsUrl, { params: {roomId: roomIdSelected, date: dateSelected, hour: hourSelected}})
  }
}

