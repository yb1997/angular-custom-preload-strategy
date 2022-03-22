import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { UsersPageComponent } from './users/users-page.component';

const routes: Route[] = [
  {
    path: "",
    children: [
      { path: "users", component: UsersPageComponent }
    ],
    canActivateChild: [AuthGuard]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
