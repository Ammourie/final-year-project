import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './_components/nav-bar/nav-bar.component';
import { FooterComponent } from './_components/footer/footer.component';
import { AboutPageComponent } from './_components/about-page/about-page.component';
import { StudentsComponent } from './_components/students/students.component';
import { CoachesComponent } from './_components/coaches/coaches.component';
import { CoachesAddPostComponent } from './_components/coaches-add-post/coaches-add-post.component';
import { RouterModule } from '@angular/router';
import { CoachesListComponent } from './_components/coaches-list/coaches-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PracticeGroubsComponent } from './_components/practice-groubs/practice-groubs.component';
import { CalendarComponent } from './_components/calendar/calendar.component';
import { GroupsRegisterComponent } from './_components/groups-register/groups-register.component';
import { CarouselModule } from 'primeng/carousel';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainPracticePageComponent } from './_components/main-practice-page/main-practice-page.component';
import {MatTabsModule}from "@angular/material/tabs";
import { ProfileComponent } from './_components/profile/profile.component';
import { PagenotfoundComponentComponent } from './_components/pagenotfound-component/pagenotfound-component.component'

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
    MainPracticePageComponent,
    ProfileComponent,
    PagenotfoundComponentComponent,
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
    FormsModule,
    HttpClientModule,MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
