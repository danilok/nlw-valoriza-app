import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/auth/user.guard';
import { ComplimentComponent } from './compliment/compliment.component';
import { ComplimentsComponent } from './compliments/compliments.component';
import { DashboardComponent } from './dashboard.component';
import { TagsComponent } from './tags/tags.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'tags',
        component: TagsComponent,
      },
      {
        path: 'compliments',
        component: ComplimentsComponent,
      },
      {
        path: 'compliment',
        component: ComplimentComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
      },
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule { }
