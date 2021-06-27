import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { UsersComponent } from './users/users.component';
import { TagsComponent } from './tags/tags.component';
import { ComplimentsComponent } from './compliments/compliments.component';
import { ComplimentComponent } from './compliment/compliment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DarkenOnHoverModule } from '../shared/directives/darken-on-hover/darken-on-hover.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DarkenOnHoverModule,
    DashboardRoutingModule
  ],
  exports: [DashboardComponent],
  declarations: [
    DashboardComponent,
    UsersComponent,
    TagsComponent,
    ComplimentsComponent,
    ComplimentComponent
  ],
  providers: [],
})
export class DashboardModule { }
