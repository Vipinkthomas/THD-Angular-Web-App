import { RoomsComponent } from './rooms/rooms.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { StartComponent } from './start/start.component';
import { InternationalComponent } from './international/international.component';
import { LoginComponent } from './login/login.component';

const routes:Routes=[
  { path: '', component: StartComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'international', component: InternationalComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
