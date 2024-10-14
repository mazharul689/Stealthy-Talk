import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMessageComponent } from './all-message/all-message.component';
const routes: Routes = [
  {
    path: 'all-messages',
    component: AllMessageComponent,
  },
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
export class InboxRoutingModule { }
