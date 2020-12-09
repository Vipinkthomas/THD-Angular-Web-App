import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
//import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth:AuthService,private _router:Router){}
  canActivate():boolean{

    if(this._auth.loggedIn()){
      return true
    }
    else{
      this._router.navigate(['/login'])
      return false
    }

  }

  
}
