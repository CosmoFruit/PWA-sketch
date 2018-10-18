import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef }                from '@angular/material';
import { AuthService }                                  from '../services/auth.service';


export interface LoginDialogData {
  appVerifier;
}


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [ './login-form.component.scss' ],
})
export class LoginFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginFormComponent>,
              private _cd: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: LoginDialogData,
              private _authService: AuthService, ) {
  }

  phone = '';
  code = '';

  isSMSed = false;

  ngOnInit() {
  }

  sendSMS() {
    this._authService.login(this.phone, this.data.appVerifier)
      .subscribe(
      res => {
        console.log(res);
        this.isSMSed = true;
        this._cd.detectChanges();
      },
      err => console.log(err)
    );
  }

  verifyLogin() {
    this._authService.confirmLogin(this.code)
      .subscribe(
        res => {
          console.log(res);
          this.dialogRef.close();
        },
        err => console.log(err)
      );
  }

}
