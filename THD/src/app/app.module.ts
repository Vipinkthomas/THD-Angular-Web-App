
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { OutdoorComponent } from './navigation/outdoor/outdoor.component';
import { IndoorComponent } from './navigation/indoor/indoor.component';
import { RoomsComponent } from './rooms/rooms.component';
import { InternationalComponent } from './international/international.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EventsComponent } from './events/events.component';
import { NewsComponent } from './news/news.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './share/material.module';
import { FlexLayoutModule } from "@angular/flex-layout";


import { I18nModule } from './i18n/i18n.module';
import { SelectLanguageComponent } from './select-language/select-language.component';


import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';

import { PopUpService } from './service/pop-up.service';
import { AuthService } from './service/auth.service';
import { MarkerService } from './service/marker.service';
import { EventService } from './service/event.service';
import { AuthGuard } from './service_guard/auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';


/**
 Main THD Module 
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
    IndoorComponent
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
  providers: [AuthService,MarkerService,EventService,AuthGuard,PopUpService,
  { 
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true

  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
