import { Routes } from '@angular/router';
import { FakultetComponent } from './components/fakultet/fakultet';
import { HomeComponent } from './components/home/home';
import { DepartmanComponent } from './components/departman/departman';
import { StatusComponent } from './components/status/status';
import { StudentComponent } from './components/student/student';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fakultet', component: FakultetComponent },
  { path: 'departman', component: DepartmanComponent },
  { path: 'status', component: StatusComponent },
  { path: 'student', component: StudentComponent }
];