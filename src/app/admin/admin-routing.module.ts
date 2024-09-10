import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'stego',
    loadChildren: () =>
      import('./image-steganography/image-steganography.module').then((m) => m.ImageSteganographyModule),
  },
  // {
  //   path: 'users-menu',
  //   loadChildren: () =>
  //     import('./users-menu/users-menu.module').then((m) => m.UsersMenuModule),
  // },
  // {
  //   path: 'teachers',
  //   loadChildren: () =>
  //     import('./teachers/teachers.module').then((m) => m.TeachersModule),
  // },
  // {
  //   path: 'students',
  //   loadChildren: () =>
  //     import('./students/students.module').then((m) => m.StudentsModule),
  // },
  // {
  //   path: 'courses',
  //   loadChildren: () =>
  //     import('./courses/courses.module').then((m) => m.CoursesModule),
  // },
  // {
  //   path: 'class-schedule',
  //   loadChildren: () =>
  //     import('./class-schedule/class-schedule.module').then((m) => m.ClassScheduleModule),
  // },
  // {
  //   path: 'student-attendance',
  //   loadChildren: () =>
  //     import('./student-attendance/student-attendance.module').then((m) => m.StudentAttendanceModule),
  // },
  // {
  //   path: 'communication',
  //   loadChildren: () =>
  //     import('./communication/communication.module').then((m) => m.CommunicationModule),
  // },
  // {
  //   path: 'library',
  //   loadChildren: () =>
  //     import('./library/library.module').then((m) => m.LibraryModule),
  // },
  // {
  //   path: 'departments',
  //   loadChildren: () =>
  //     import('./departments/departments.module').then(
  //       (m) => m.DepartmentsModule
  //     ),
  // },
  // {
  //   path: 'staff',
  //   loadChildren: () =>
  //     import('./staff/staff.module').then((m) => m.StaffModule),
  // },
  // {
  //   path: 'holidays',
  //   loadChildren: () =>
  //     import('./holidays/holidays.module').then((m) => m.HolidaysModule),
  // },
  // {
  //   path: 'fees',
  //   loadChildren: () => import('./fees/fees.module').then((m) => m.FeesModule),
  // },
  // {
  //   path:'finance',
  //   loadChildren: () => import('./finance/finance.module').then((m) => m.FinanceModule)
  // },
  // {
  //   path: 'enrolment',
  //   loadChildren: () => import('./enrolment/enrolment.module').then((m) => m.EnrolmentModule),
  // },
  // {
  //   path: 'outcome',
  //   loadChildren: () => import('./outcome/outcome.module').then((m) => m.OutcomeModule),
  // },
  // {
  //   path: 'bulk-outcome',
  //   loadChildren: () => import('./bulk-outcome/bulk-outcome.module').then((m) => m.BulkOutcomeModule),
  // },
  // {
  //   path: 'certificate',
  //   loadChildren: () => import('./certificate/certificate.module').then((m) => m.CertificateModule),
  // },
  // {
  //   path: 'units',
  //   loadChildren: () => import('./units/units.module').then((m) => m.UnitsModule),
  // },
  // {
  //   path: 'course-unit',
  //   loadChildren: () => import('./course-unit/course-unit.module').then((m) => m.CourseUnitModule),
  // },
  // {
  //   path: 'location',
  //   loadChildren: () => import('./location/location.module').then((m) => m.LocationModule)
  // },
  // {
  //   path:'reports',
  //   loadChildren: () => import('./reports/reports.module').then((m) => m.ReportsModule)
  // },

  // {
  //   path:'asqa-report',
  //   loadChildren: () => import('./asqa-report/asqa-report.module').then((m) => m.AsqaReportModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
