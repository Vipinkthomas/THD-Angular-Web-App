import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

 /**
  * navigaiton point  component
  */ 
@Injectable({
  providedIn: 'root'
})

  /**
  * navigaiton point  class
  */ 
export class NavigationService {

  /**
  * api urls for navigation pointers
  */
  private navigationUrl="http://localhost:3000/api/navigation"

  /**
  * api urls for creating new navigation points 
  */
  private createNavigationUrl="http://localhost:3000/api/addnav"

  /**
  * api urls for updating navigation points
  */
  private updateNavigationUrl="http://localhost:3000/api/updatenav"

  /**
  * api urls for deleting navigation points
  */
  private deleteNavigationUrl="http://localhost:3000/api/deletenav"

  /**
  * constructor
  */ 
  constructor(private _http:HttpClient) { }

  /**
  * @example
  * to get navigations points
  * getNavigation()
  *
  * @param {} null
  * @returns response from server
  */
  getNavigation(){
    return this._http.get<any>(this.navigationUrl)
  }

  /**
  * @example
  * to create new points
  * createNavigation(data)
  *
  * @param {JSON} data  new navigation point info{@link Todo}
  * @returns response from server
  */
  createNavigation(data){ 
    return this._http.post<any>(this.createNavigationUrl,data)
  }

  /**
  * @example
  * to update an existing map pointer
  * updateNavigation(data)
  *
  * @param {JSON} data  updated navigation point info{@link Todo}
  * @returns response from server
  */
  updateNavigation(data){
    return this._http.post<any>(this.updateNavigationUrl,data)
  }

  /**
  * @example
  * to delete navigation point
  * deleteNavigation(data)
  *
  * @param {JSON} data  delete pointer info{@link Todo}
  * @returns response from server
  */
  deleteNavigation(data){
    return this._http.post<any>(this.deleteNavigationUrl,data)
  }
}
