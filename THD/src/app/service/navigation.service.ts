import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private navigationUrl="http://localhost:3000/api/navigation"
  private createNavigationUrl="http://localhost:3000/api/addnav"
  private updateNavigationUrl="http://localhost:3000/api/updatenav"
  private deleteNavigationUrl="http://localhost:3000/api/deletenav"

  constructor(private _http:HttpClient) { }

  getNavigation(){
    return this._http.get<any>(this.navigationUrl)
  }
  createNavigation(data){
    return this._http.post<any>(this.createNavigationUrl,data)
  }
  updateNavigation(data){
    return this._http.post<any>(this.updateNavigationUrl,data)
  }

  deleteNavigation(data){
    return this._http.post<any>(this.deleteNavigationUrl,data)
  }
}
