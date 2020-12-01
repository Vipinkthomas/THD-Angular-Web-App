import { Component, OnInit } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

interface Languages {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})


export class SelectLanguageComponent implements OnInit {
  
  languages: Languages[] = [
    { value: 'en', viewValue: 'EN' },
    { value: 'de', viewValue: 'DE' }
  ]

  ngOnInit() {
    console.log("SelectLanguageComponent OnInit: " + this.translate.currentLang);
   
  }

  constructor(public translate: TranslateService) { }

  changeLanguage(l: string): void {
    this.translate.use(l);
    console.log("changeLanguage: " + l);
  }
}
