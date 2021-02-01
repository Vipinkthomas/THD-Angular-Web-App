import { Injectable } from '@angular/core';

/**
 * popup messages for navigation markers
 */
@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  /**
  * constructor
  */
  constructor() { }

  /**
  * @example
  * to ceate pop up of markers
  * makeCapitalCirclePopup(data: any)
  *
  * @param {JSON} data  Markers info{@link Todo}
  * @returns html popup
  */
  makeCapitalCirclePopup(data: any): any {
    return `` + `<div>${ data.name }</div>`
  }
}
