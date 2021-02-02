import { AuthService } from '../service/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';


/**
 * Authguard service
 */
@Injectable({
  providedIn: 'root'
})


/**
 * Authguard service for registered area
 */
export class AuthGuard implements CanActivate {


  /**
 * constructor
 */
  constructor(private _auth:AuthService,private _router:Router){}

  /**
  * which will check whether the user can access the protected area or not
  */
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
