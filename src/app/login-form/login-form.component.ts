import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef }                                       from '@angular/material';
import { AuthService }                                                         from '../services/auth.service';
import { FormControl, Validators }                                             from '@angular/forms';
import { finalize }                                                            from 'rxjs/operators';
import { IUserInfo, UserService }                                              from '../services/user.service';


export interface LoginDialogData {
  appVerifier;
}


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [ './login-form.component.scss' ],
})
export class LoginFormComponent implements OnInit {

  @ViewChild('codeInput') private codeInput: ElementRef;

  constructor(public dialogRef: MatDialogRef<LoginFormComponent>,
              private _cd: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: LoginDialogData,
              private _authService: AuthService,
              private _userService: UserService) {
  }

  phone = new FormControl('', [ Validators.required, Validators.minLength(10) ]);
  code = new FormControl({
    value: '',
    disabled: true,
  }, [ Validators.required, Validators.minLength(6) ]);

  isSMSing = false;
  isSMSed = false;

  isVerifiengCode = false;

  ngOnInit() {
  }

  sendSMS() {
    if (this.phone.valid && !this.isSMSing) {
      this.isSMSing = true;
      this.phone.disable();

      this._authService.login('+7' + this.phone.value, this.data.appVerifier)
        .pipe(
          finalize(() => {
            this.isSMSing = false;
            this._cd.detectChanges();
          }),
        )
        .subscribe(
          res => {
            console.log(res);
            this.isSMSed = true;
            this.code.enable();
            this.codeInput.nativeElement.focus();
            this._cd.detectChanges();
          },
          err => {
            this.phone.enable();
            console.log(err);
          },
        );
    }
  }

  verifyLogin() {
    if (this.code.valid && !this.isVerifiengCode) {
      this.isVerifiengCode = true;
      this.code.disable();

      this._authService.confirmLogin(this.code.value)
        .pipe(
          finalize(() => {
            this.isVerifiengCode = false;
            this._cd.detectChanges();
          }),
        )
        .subscribe(
          data => {
            console.log(data);

            const res: IUserInfo = data.user;

            this._userService.updateUserbyUid({
              uid: res.uid,
              displayName: res.displayName,
              photoURL: res.photoURL,
              phoneNumber: res.phoneNumber,
              email: res.email,
              emailVerified: res.emailVerified,
              isOnline: true,
            }).subscribe(res2 => console.log(res2), err2 => console.log(err2));

            this.dialogRef.close();
          },
          err => {
            this.code.enable();
            this.codeInput.nativeElement.focus();
            this.code.setErrors({ notRight: true });
            console.log(err);
          },
        );
    }
  }

}
