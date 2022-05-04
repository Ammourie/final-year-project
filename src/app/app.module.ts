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
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'coaches/add-post', component: CoachesAddPostComponent },
      { path: 'coaches/list', component: CoachesListComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
