import { LoginComponent } from './_components/login/login.component';
import { GroupsRegisterComponent } from './_components/groups-register/groups-register.component';
import { CalendarComponent } from './_components/calendar/calendar.component';
import { PracticeGroubsComponent } from './_components/practice-groubs/practice-groubs.component';
import { AboutPageComponent } from './_components/about-page/about-page.component';
import { StudentsComponent } from './_components/students/students.component';
import { CoachesAddPostComponent } from './_components/coaches-add-post/coaches-add-post.component';
import { CoachesListComponent } from './_components/coaches-list/coaches-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachesComponent } from './_components/coaches/coaches.component';
import { RegisterComponent } from './_components/register/register.component';

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
    path: 'group-register',
    component: GroupsRegisterComponent,

  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'register',
    component: RegisterComponent,

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
