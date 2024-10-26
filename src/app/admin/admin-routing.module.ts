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
  {
    path: 'inbox',
    loadChildren: () =>
      import('./inbox/inbox.module').then((m) => m.InboxModule),
  },
  {
    path: 'edit-profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
