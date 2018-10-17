import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { MeetingsListComponent } from './meetings-list/meetings-list.component';
import { MeetingInfoComponent }  from './meeting-info/meeting-info.component';
import { UserProfileComponent }  from './user-profile/user-profile.component';
import { MeetingAddComponent }   from './meeting-add/meeting-add.component';

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
    path: 'meeting/add',
    component: MeetingAddComponent,
  },
  {
    path: 'meeting/:id',
    component: MeetingInfoComponent,
  },
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}
