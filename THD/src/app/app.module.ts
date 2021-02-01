/**
* Main THD Module imports
* Components
* Modules
* Services
*
*/
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { OutdoorComponent } from './navigation/outdoor/outdoor.component';
import { IndoorComponent } from './navigation/indoor/indoor.component';
import { ConfigComponent } from './navigation/config/config.component';
import { RoomsComponent } from './rooms/rooms.component';
import { InternationalComponent } from './international/international.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EventsComponent } from './events/events.component';
import { NewsComponent } from './news/news.component';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './share/material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { I18nModule } from './i18n/i18n.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PopUpService } from './service/pop-up.service';
import { AuthService } from './service/auth.service';
import { MarkerService } from './service/marker.service';
import { EventService } from './service/event.service';
import { AuthGuard } from './service_guard/auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { NavigationService } from './service/navigation.service';



/**
* Main THD Module 
* Declarations
* Imports
* Providers
* Bootstrap
*
*/

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    OutdoorComponent,
    RoomsComponent,
    InternationalComponent,
    LoginComponent,
    SelectLanguageComponent,
    AdminComponent,
    NavbarComponent,
    EventsComponent,
    NewsComponent,
    RegisterComponent,
    IndoorComponent,
    ConfigComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    I18nModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    ],
  providers: [AuthService,MarkerService,EventService,AuthGuard,PopUpService,NavigationService,
  { 
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true

  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
