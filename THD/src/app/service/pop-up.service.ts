import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  makeCapitalCirclePopup(data: any): any {
    return `` + `<div>${ data.name }</div>`
  }
}
