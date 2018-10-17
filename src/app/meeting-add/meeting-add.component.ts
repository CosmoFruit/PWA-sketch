import { Component, OnInit }                        from '@angular/core';
import { IUser, IUserInfo, UserService }            from '../services/user.service';
import { Observable }                               from 'rxjs';
import { FormBuilder, Validators }                  from '@angular/forms';
import { IMeeting, IMeetingMember, MeetingService } from '../services/meeting.service';
import { Router }                                   from '@angular/router';


export class Meeting implements IMeeting {
  city = '';
  address = '';
  time;
  gameKitsCount = 0;
  comment = '';
  members: IMeetingMember[] = [];
  author: IUser = {
    uid: '',
    displayName: '',
    photoURL: '',
  };

  constructor(value) {
    Object.assign(this, value);
  }
}


@Component({
  selector: 'app-meeting-add',
  templateUrl: './meeting-add.component.html',
  styleUrls: [ './meeting-add.component.scss' ],
})
export class MeetingAddComponent implements OnInit {

  constructor(private _usetService: UserService,
              private _dataService: MeetingService,
              private _router: Router,
              private _fb: FormBuilder) {
    this.meetingForm = _fb.group({
      city: [
        {
          value: 'Санкт-Петербург',
          disabled: true,
        },
      ],
      address: [ 'парк Сосновка', Validators.required ],
      time: [ 'четверг 25.10 в 12:30', Validators.required ],
      gameKitsCount: [ '1', Validators.required ],
      comment: [ 'тест, приходить ненадо' ],
    });
  }

  user$: Observable<IUserInfo> = this._usetService.user$;

  meetingForm;

  ngOnInit() {
  }

  submit() {
    const data: IMeeting = new Meeting(this.meetingForm.getRawValue());

    const user = this._usetService.getUserInfo();

    data.author.uid = user.uid;
    data.author.displayName = user.displayName;
    data.author.photoURL = user.photoURL;

    this._dataService.addMeeting(data).subscribe(
      res => {
        console.log(res);
        this._router.navigate([ '/' ]);
      },
      err => console.log(err),
    );
  }

}
