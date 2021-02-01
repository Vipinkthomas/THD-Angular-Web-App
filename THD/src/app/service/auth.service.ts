import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Auth service for authenication management has states
 * loggedin true/false
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl="http://localhost:3000/api/register"
  private _loginUrl="http://localhost:3000/api/login"

  constructor(private http:HttpClient,private router:Router) { }

  /**
  * @example
  * to register
  * register(user)
  *
  * @param {string} user  user info{@link Todo}
  * @returns response from server
  */
  register(user){
    return this.http.post<any>(this._registerUrl,user)
  }

  /**
  * @example
  * to login
  * login(user)
  *
  * @param {string} user  user info{@link Todo}
  * @returns response from server
  */
  login(user){
    return this.http.post<any>(this._loginUrl,user)
  }

  /**
  * @example
  * check whether user is logged in or not
  * loggedIn()
  *
  * @param {} null
  * @returns {boolean}
  */
  loggedIn(){
    return !!localStorage.getItem('token')
  }

  /**
  * @example
  * remove token and redirect to login page
  * to logout
  * logoutUser()
  *
  * @param {string} 
  * @returns null
  */
  logoutUser(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  /**
  * @example
  * to get token from localstorage
  * getToken()
  *
  * @param {string} user  user info{@link Todo}
  * @returns response from server
  */
  getToken(){
    return localStorage.getItem('token')
  }
}
