import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private navigationUrl="http://localhost:3000/api/navigation"

  constructor(private _http:HttpClient) { }

  getNavigation(data){
    return this._http.post<any>(this.navigationUrl,data)
  }
}
