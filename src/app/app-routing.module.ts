import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageTeamComponent } from './pages/page-team/page-team.component';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { PageEventComponent } from './pages/page-event/page-event.component';

const routes: Routes = [
  {
    path: '',
    component: PageHomeComponent,
  },
  {
    path: 'team',
    component: PageTeamComponent,
  },
  {
    path: 'events/:id',
    component: PageEventComponent,
  },
  {
    path: 'event/add',
    component: AddEventComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'register',
    component: PageRegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
