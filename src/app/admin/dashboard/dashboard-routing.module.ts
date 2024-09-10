// import { DashboardComponent as studentDashboard } from './../../student/dashboard/dashboard.component';
// import { DashboardComponent as teacherDashboard } from './../../teacher/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
// import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'dashboard2',
    component: Dashboard2Component,
  },
  // {
  //   path: 'teacher-dashboard',
  //   component: teacherDashboard,
  // },
  // {
  //   path: 'student-dashboard/:sid/:id',
  //   component: StudentDashboardComponent,
  // },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
