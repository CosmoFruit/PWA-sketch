import { Component, OnInit }                        from '@angular/core';
import { IUser, IUserInfo, UserService }            from '../services/user.service';
import { Observable }                               from 'rxjs';
import { FormBuilder, Validators }                  from '@angular/forms';
import { IMeeting, IMeetingMember, MeetingService } from '../services/meeting.service';
import { Router }                                   from '@angular/router';


export class Meeting implements IMeeting {
  city = '';
  address = '';
  date = '';
  time = '';
  timeStamp = null;
  gameKitsCount = 0;
  comment = '';
  members: IMeetingMember[] = [];
  author: IUser = {
    uid: '',
    displayName: '',
    photoURL: '',
  };
  isCanceled = false;

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
      address: [ '', Validators.required ],
      date: [ '', Validators.required ],
      time: [ '', Validators.required ],
      gameKitsCount: [ '1', Validators.required ],
      comment: [ '' ],
    });
  }

  user$: Observable<IUserInfo> = this._usetService.user$;

  meetingForm;

  ngOnInit() {
  }

  submit() {
    if(this.meetingForm.invalid) {
      return;
    }

    const data: IMeeting = new Meeting(this.meetingForm.getRawValue());

    const user = this._usetService.getUserInfo();

    const currTime = new Date();
    const eventDate = data.date.split('/');
    const eventTime = data.time.split(':');

    let eventYear = currTime.getFullYear();

    console.log(currTime.getMonth());
    console.log(+eventDate[1] - 1);
    console.log(currTime.getDate());
    console.log(+eventDate[0]);

    if ((+eventDate[1] - 1) < currTime.getMonth()) {
      eventYear += 1;
    } else if (
      ((+eventDate[1] - 1) === currTime.getMonth())
      &&
      ((+eventDate[0]) < currTime.getDate())
    ) {
      eventYear += 1;
    }

    data.timeStamp = new Date(eventYear, +eventDate[1] - 1, +eventDate[0], +eventTime[0], +eventTime[1]);

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
