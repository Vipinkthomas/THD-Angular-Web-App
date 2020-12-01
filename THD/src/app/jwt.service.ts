import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  login(userData: User) {
    console.log(userData.email + ";" + userData.password);
    localStorage.setItem('access_token', userData.email + ";" + userData.password); // simple
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

}

