/**
 * Main THD Module
 * 
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/**
 * Components
 */

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RoomsComponent } from './rooms/rooms.component';
import { InternationalComponent } from './international/international.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Material Design elements can be found in Material Module "./share/material.module"
 */

import { MaterialModule } from './share/material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
/**
 * Language Module and component
 */
import { I18nModule } from './i18n/i18n.module';
import { SelectLanguageComponent } from './select-language/select-language.component';


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    NavigationComponent,
    RoomsComponent,
    InternationalComponent,
    LoginComponent,
    SelectLanguageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: StartComponent },
      { path: 'navigation', component: NavigationComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'international', component: InternationalComponent },
      { path: 'login', component: LoginComponent }
    ]),
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    I18nModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
