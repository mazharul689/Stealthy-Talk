import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './all-users/all-users.component'
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserRequestsComponent } from './user-requests/user-requests.component';
import { EditUserRequestsComponent } from './edit-user-requests/edit-user-requests.component';

const routes: Routes = [
  {
    path: 'all-users',
    component: AllUsersComponent
  },
  {
    path: 'new-user',
    component: NewUserComponent
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent
  },
  {
    path: 'user-requests',
    component: UserRequestsComponent
  },
  {
    path: 'edit-user-requests/:id',
    component: EditUserRequestsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
