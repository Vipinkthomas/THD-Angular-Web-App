import { AuthService } from './auth.service';
import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

/**
 * Interceptor pattern to manipulate authorization header
 */
@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor{

  /**
  * constructor
  */
  constructor(private injector:Injector) { 

  }

  /**
  * @example
  * to set authorization headers
  * intercept(req,next)
  *
  * @param {} null
  * @returns tokenized request to next handle
  */
  intercept(req,next){
    let authService=this.injector.get(AuthService)
    let tokenizedReq=req.clone({
    setHeaders:{
      Authorization:'Bearer '+ authService.getToken()
    }
  })
  return next.handle(tokenizedReq)

  }
  
}
