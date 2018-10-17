import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher }                                                   from '@angular/cdk/layout';
import { Observable }                                                     from 'rxjs';
import * as firebase                                                      from 'firebase/app';
import { MeetingService }                                                 from './services/meeting.service';
import { UserService }                                                    from './services/user.service';
import { AuthService }                                                    from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,

              private _userService: UserService, ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  user$ = this._userService.user$;

  appVerifier;

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.appVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  login() {

  }

  logout() {

  }
}
