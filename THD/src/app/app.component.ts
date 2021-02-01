import { Component } from '@angular/core';

/**
 * Root Component
 * 
 *
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * AppComponent Class
 */
export class AppComponent {

  /**
   * @param {string} title 'THD' title of the app
   */
  title:string = 'THD';

}
