import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EventComponent } from './components/event/event.component';
import { PageEventComponent } from './pages/page-event/page-event.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageTeamComponent } from './pages/page-team/page-team.component';
import { TeamComponent } from './components/team/team.component';

import { HttpClientModule } from '@angular/common/http';
import { FhotoPrincipalComponent } from './components/fhotoprincipal/fhotoPrincipal.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    EventComponent,
    FhotoPrincipalComponent,
    PageEventComponent,
    PageHomeComponent,
    PageTeamComponent,
    TeamComponent,
    EventDetailsComponent,
    PageRegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
