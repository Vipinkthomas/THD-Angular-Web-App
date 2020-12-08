
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { NavigationComponent } from './navigation/navigation.component';
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

import { AuthService } from './auth.service';
import { EventService } from './event.service';

/**
 Main THD Module 
*/

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    NavigationComponent,
    RoomsComponent,
    InternationalComponent,
    LoginComponent,
    SelectLanguageComponent,
    AdminComponent,
    NavbarComponent,
    EventsComponent,
    NewsComponent,
    RegisterComponent
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
  providers: [AuthService,EventService],
  bootstrap: [AppComponent]

})
export class AppModule { }
