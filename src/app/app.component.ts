import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit }      from '@angular/core';
import { MediaMatcher }                                                        from '@angular/cdk/layout';
import * as firebase                                                           from 'firebase/app';
import { UserService }                                                         from './services/user.service';
import { AuthService }                                                         from './services/auth.service';
import { shareReplay }                                                         from 'rxjs/operators';
import { MatDialog }                                                           from '@angular/material';
import { LoginFormComponent }                                                  from './login-form/login-form.component';
import { DialogEventInitState, EdialogEventType, IdialogEvent, NotifyService } from './services/notify.service';


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
              private _msgService: NotifyService,
              private _userService: UserService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  user$ = this._userService.user$.pipe(shareReplay(1));
  loading = true;

  appVerifier;

  ngOnInit() {
    this.user$.subscribe((res) => {
      console.log(res);
      this.loading = false;
    });
    this._msgService.snackBarMsg$.subscribe();
    this._msgService.dialogEvent$.subscribe((event: IdialogEvent) => {
      if (event.type === EdialogEventType.OPEN_LOGIN) {
        this.openLoginDialog(event.text);
        this._msgService.sendDialogEvent(new DialogEventInitState);
      }
    });
  }

  ngAfterViewInit() {
    this.appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  openLoginDialog(text?: string): void {
    const dialogRef = this._dialog.open(LoginFormComponent, {
      width: '320px',
      data: {
        appVerifier: this.appVerifier,
        title: text,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The login dialog was closed');
    });
  }

  logout() {
    this._authService.logout();
  }
}
