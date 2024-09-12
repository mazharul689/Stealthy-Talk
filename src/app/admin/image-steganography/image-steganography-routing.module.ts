import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncryptImageComponent } from './encrypt-image/encrypt-image.component';
import { DecryptImageComponent } from './decrypt-image/decrypt-image.component';
import { AllEncryptedImageComponent } from './all-encrypted-image/all-encrypted-image.component';
import { AllUsersComponent } from './all-users/all-users.component';
const routes: Routes = [
  {
    path: 'encrypt-image',
    component: EncryptImageComponent
  },
  // {
  //   path: 'decrypt-image',
  //   component: DecryptImageComponent
  // },
  {
    path: 'decrypt-image/:id',
    component: DecryptImageComponent
  },
  {
    path: 'all-encrypted-image',
    component: AllEncryptedImageComponent
  },
  {
    path: 'all-users/:id',
    component: AllUsersComponent
  }
  // {
  //   path: 'new-user',
    // component: NewUserComponent
  // },
  // {
  //   path: 'edit-user/:id',
    // component: EditUserComponent
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageSteganographyRoutingModule { }
