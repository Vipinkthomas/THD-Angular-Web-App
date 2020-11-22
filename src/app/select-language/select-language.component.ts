import { Component, OnInit } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

interface Languages {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.css']
})


export class SelectLanguageComponent implements OnInit {

  ngOnInit() {
    console.log("SelectLanguageComponent OnInit: " + this.translate.currentLang);
    switch (this.translate.currentLang) {
      case 'de':
        this.langView = "Sprache";
        this.currLangViewValue = 'DE';
        break;

      default:
        this.langView = "Language";
        this.currLangViewValue = 'EN';
        break;
    }
    console.log("SelectLanguageComponent OnInit: " + this.currLangViewValue);
  }

  constructor(public translate: TranslateService) { }

  languages: Languages[] = [
    { value: 'en', viewValue: 'EN' },
    { value: 'de', viewValue: 'DE' }
  ]



  langView = 'Language'; // default language is English
  currLangViewValue = 'EN';


  changeLanguage(l: string): void {
    this.translate.use(l);
    console.log("changeLanguage: " + l);
    switch (l) {
      case 'de': this.langView = 'Sprache'; break;
      default: this.langView = 'Language'
    }
  }
}
