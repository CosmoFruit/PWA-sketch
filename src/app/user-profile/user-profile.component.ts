import { Component, OnInit }       from '@angular/core';
import { IUserInfo, UserService }  from '../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.scss' ],
})
export class UserProfileComponent implements OnInit {

  constructor(private _usetService: UserService,
              private _fb: FormBuilder) {
    this.userInfo = this._usetService.getUserInfo();

    this.userForm = _fb.group({
      firstName: [ this.userInfo.displayName.split(' ')[ 0 ], Validators.required ],
      lastName: [ this.userInfo.displayName.split(' ')[ 1 ], Validators.required ],
      phoneNumber: [
        {
          value: this.userInfo.phoneNumber,
          disabled: true,
        },
      ],
      email: [ this.userInfo.email ],
    });
  }

  userForm;
  userInfo: IUserInfo;

  ngOnInit() {
  }

  updateProfile() {
    let data = this.userForm.getRawValue();

    this._usetService.updateProfile({displayName: `${data.firstName} ${data.lastName}`, photoURL: null})
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }

}
