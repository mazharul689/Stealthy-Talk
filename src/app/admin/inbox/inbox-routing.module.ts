import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  // {
  //   path: 'encrypt-image',
  //   component: EncryptImageComponent
  // },
  // {
  //   path: 'decrypt-image',
  //   component: DecryptImageComponent
  // },
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
