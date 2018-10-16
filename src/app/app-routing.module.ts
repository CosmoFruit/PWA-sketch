import { NgModule }              from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AppComponent }          from './app.component';
import { MeetingsListComponent } from './meetings-list/meetings-list.component';
import { MeetingInfoComponent }  from './meeting-info/meeting-info.component';
import { UserProfileComponent }  from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: MeetingsListComponent,
  },
  {
    path: 'user',
    component: UserProfileComponent,
  },
  {
    path: ':id',
    component: MeetingInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
