import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { StudentsComponent } from './students/students.component';
import { CoachesComponent } from './coaches/coaches.component';
import { CoachesAddPostComponent } from './coaches-add-post/coaches-add-post.component';
import { RouterModule } from '@angular/router';
import { CoachesListComponent } from './coaches-list/coaches-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PracticeGroubsComponent } from './practice-groubs/practice-groubs.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GroupsRegisterComponent } from './groups-register/groups-register.component';
import { CarouselModule } from 'primeng/carousel';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    AboutPageComponent,
    StudentsComponent,
    CoachesComponent,
    CoachesAddPostComponent,
    CoachesListComponent,
    PracticeGroubsComponent,
    CalendarComponent,
    GroupsRegisterComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    CarouselModule,
    ButtonModule,
    DialogModule,
    MatRadioModule,
    ToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
