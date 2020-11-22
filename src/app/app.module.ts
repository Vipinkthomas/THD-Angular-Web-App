import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/**
 * Project was created without Routing option
 * so Routing will be setup here (otherwise in app-routing.module.ts)
 * followed https://angular.io/start/start-routing
 * used structure from mit-ws-20-21-requests.pdf
 * so components needed are: Start, Navigation, Room Info, Int. Office, Login
 * difference to structure image: gave navigation higher prio than room info
 * 
*/

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RoomsComponent } from './rooms/rooms.component';
import { InternationalComponent } from './international/international.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from "@angular/flex-layout";
// Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSidenavModule,
} from '@angular/material/sidenav';
import {
  MatListModule,
} from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { I18nModule } from './i18n/i18n.module';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'


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
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    I18nModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
