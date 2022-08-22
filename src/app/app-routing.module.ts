import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageEventComponent } from './pages/page-event/page-event.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageTeamComponent } from './pages/page-team/page-team.component';

const routes: Routes = [
  {
    path: '',
    component: PageHomeComponent
  },
  {
    path: 'team',
    component: PageTeamComponent
  },
  {
    path: 'event',
    component: PageEventComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
