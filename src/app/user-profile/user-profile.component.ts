import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService }                  from '../services/user.service';
import { FormBuilder, Validators }      from '@angular/forms';
import { filter }                       from 'rxjs/operators';
import { Subscription }                 from 'rxjs';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.scss' ],
})
export class UserProfileComponent implements OnInit, OnDestroy {

  constructor(private _usetService: UserService,
              private _fb: FormBuilder) {

    this.userForm = _fb.group({
      firstName: [ '', Validators.required ],
      lastName: [ '', Validators.required ],
      phoneNumber: [
        {
          value: '',
          disabled: true,
        },
      ],
      email: [ '' ],
    });
  }

  userForm;
  subscription: Subscription;

  ngOnInit() {
    this.subscription = this._usetService.user$
      .pipe(
        filter(x => !!x),
      )
      .subscribe(data => this.userForm.patchValue({
          firstName: data.displayName ? data.displayName.split(' ')[ 0 ] : '',
          lastName: data.displayName ? data.displayName.split(' ')[ 1 ] : '',
          phoneNumber: data.phoneNumber,
          email: data.email,
        }),
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateProfile() {
    const data = this.userForm.getRawValue();

    this._usetService.updateProfile({
      displayName: `${data.firstName} ${data.lastName}`,
      photoURL: null,
    })
      .subscribe(
        res => console.log(res),
        err => console.log(err),
      );
  }

}
