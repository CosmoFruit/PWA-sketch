import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher }                                                   from '@angular/cdk/layout';
import { Observable }                                                     from 'rxjs';
import * as firebase                                                      from 'firebase/app';
import { MeetingService }     from './services/meeting.service';
import { UserService }        from './services/user.service';
import { AuthService }        from './services/auth.service';
import { shareReplay }        from 'rxjs/operators';
import { MatDialog }          from '@angular/material';
import { LoginFormComponent } from './login-form/login-form.component';


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
              private _dialog: MatDialog,
              private _authService: AuthService,
              private _userService: UserService, ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  user$ = this._userService.user$.pipe(shareReplay(1));
  loading = true;

  appVerifier;

  ngOnInit() {
    this.user$.subscribe( () => this.loading = false);
  }

  ngAfterViewInit() {
    this.appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  openLoginDialog(): void {
    const dialogRef = this._dialog.open(LoginFormComponent, {
      width: '320px',
      data: { appVerifier: this.appVerifier }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The login dialog was closed');
    });
  }

  logout() {
    this._authService.logout();
  }
}
