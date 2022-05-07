import { CalendarComponent } from './calendar/calendar.component';
import { PracticeGroubsComponent } from './practice-groubs/practice-groubs.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { StudentsComponent } from './students/students.component';
import { CoachesAddPostComponent } from './coaches-add-post/coaches-add-post.component';
import { CoachesListComponent } from './coaches-list/coaches-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachesComponent } from './coaches/coaches.component';

const routes: Routes = [
  {
    path: 'coaches',
    component: CoachesComponent,
    children: [
      { path: 'list', component: CoachesListComponent }, //the path will /app/youroldpath1 instead of /youroldpath1
      { path: 'add-post', component: CoachesAddPostComponent },
    ],
  },
  {
    path: 'students',
    component: StudentsComponent,

  },
  {
    path: 'practice-groups',
    component: PracticeGroubsComponent,

  },
  {
    path: 'dates',
    component: CalendarComponent,

  },
  {
    path: '',
    component: AboutPageComponent,

  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
