import { RegisterComponent } from './register/register.component';
import { NewsComponent } from './news/news.component';
import { EventsComponent } from './events/events.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { StartComponent } from './start/start.component';
import { InternationalComponent } from './international/international.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { JwtGuard } from './jwt.guard';
import { AuthGuard } from './auth.guard';

const routes:Routes=[
  { path: '', component: StartComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'international', component: InternationalComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [JwtGuard] },
  { path: 'event', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'news', component: NewsComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
