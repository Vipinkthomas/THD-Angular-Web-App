import { Component, OnInit } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';


/**
  * interface for language
  */
interface Languages {
  value: string;
  viewValue: string;
}

/**
 * for language selection
 */
@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})


export class SelectLanguageComponent implements OnInit {
  
/**
 * language array
 */
  languages: Languages[] = [
    { value: 'en', viewValue: 'EN' },
    { value: 'de', viewValue: 'DE' }
  ]

/**
 * Component Initialisation executed after constructor
 */
  ngOnInit() {
    console.log("SelectLanguageComponent OnInit: " + this.translate.currentLang);
   
  }

/**
 * constructor
 */
  constructor(public translate: TranslateService) { }

  /**
  * @example
  * to change language
  * changeLanguage(l: string)
  *
  * @param {string} l language info{@link Todo}
  * @returns void
  */
  changeLanguage(l: string): void {
    this.translate.use(l);
    console.log("changeLanguage: " + l);
  }
}
