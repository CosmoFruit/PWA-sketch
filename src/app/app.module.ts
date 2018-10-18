import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { AppRoutingModule }         from './app-routing.module';
import { AppComponent }             from './app.component';
import { ServiceWorkerModule }      from '@angular/service-worker';
import { environment }              from '../environments/environment';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { MaterialModule }           from './material/material.module';
import { AngularFireModule }        from '@angular/fire';
import { AngularFireAuthModule }    from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore }                 from '@angular/fire/firestore';
import { UserProfileComponent }             from './user-profile/user-profile.component';
import { MeetingAddComponent }              from './meeting-add/meeting-add.component';
import { MeetingInfoComponent }             from './meeting-info/meeting-info.component';
import { MeetingSnippetComponent }          from './meeting-snippet/meeting-snippet.component';
import { MeetingsListComponent }            from './meetings-list/meetings-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent }                 from './spinner/spinner.component';
import { HttpClientModule }                 from '@angular/common/http';
import { NgProgressModule }                 from '@ngx-progressbar/core';
import { NgProgressHttpModule }             from '@ngx-progressbar/http';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    MeetingAddComponent,
    MeetingInfoComponent,
    MeetingSnippetComponent,
    MeetingsListComponent,
    SpinnerComponent,
    LoginFormComponent,
  ],
  entryComponents: [
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [ AngularFirestore ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
