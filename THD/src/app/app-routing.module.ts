/**
 * THD routing Component
 * Components
 */

import { RegisterComponent } from './register/register.component';
import { NewsComponent } from './news/news.component';
import { EventsComponent } from './events/events.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { OutdoorComponent } from './navigation/outdoor/outdoor.component';
import { StartComponent } from './start/start.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './service_guard/auth.guard';
import { IndoorComponent } from './navigation/indoor/indoor.component';
import { ConfigComponent } from './navigation/config/config.component';

/**
 * THD routing
 * 
 */
const routes:Routes=[
  { path: '', component: StartComponent },
  { path: 'outdoor', component: OutdoorComponent},
  { path: 'indoor', component: IndoorComponent, canActivate: [AuthGuard] },
  { path: 'config', component: ConfigComponent, canActivate: [AuthGuard] },
  { path: 'rooms', component: RoomsComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'event', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'news', component: NewsComponent, canActivate: [AuthGuard] }

]

/**
 * Decorator that marks a class as an NgModule and supplies configuration metadata.
 */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
