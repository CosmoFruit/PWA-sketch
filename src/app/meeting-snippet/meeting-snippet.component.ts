import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IMeeting, MeetingService }            from '../services/meeting.service';
import { IUser, UserService }                  from '../services/user.service';
import { EdialogEventType, NotifyService }     from '../services/notify.service';


@Component({
  selector: 'app-meeting-snippet',
  templateUrl: './meeting-snippet.component.html',
  styleUrls: [ './meeting-snippet.component.scss' ],
})
export class MeetingSnippetComponent implements OnInit, OnChanges {

  @Input() item: IMeeting;

  @Input() user: IUser;

  isMember = false;
  isAuthor = false;
  isGetPhonenumber = false;
  isAhead = false;

  phoneNumber = '';

  constructor(private _msgService: NotifyService,
              private _userService: UserService,
              private _dataService: MeetingService) {
  }

  ngOnInit() {
    console.log(this.item);
  }

  
  ngOnChanges() {
    if (this.user) {
      if (this.item.members.some(x => x.uid === this.user.uid)) {
        this.isMember = true;
      } else {
        this.isMember = false;
      }

      if (this.item.author.uid === this.user.uid) {
        this.isAuthor = true;
      } else {
        this.isAuthor = false;
      }
    } else {
      this.isMember = false;
      this.isAuthor = false;
    }
  }

  rerunMeeting() {
    this._dataService.updateMeeting({
      id: this.item.id,
      isCanceled: false
    }).subscribe(
      res => console.log(res),
      err => console.log(err),
    );
  }

  cancelMeeting() {
    this._dataService.updateMeeting({
      id: this.item.id,
      isCanceled: true
    }).subscribe(
      res => console.log(res),
      err => console.log(err),
    );
  }

  getPhoneNumber() {
    this._userService.getUserbyUid(this.item.author).subscribe(
      res => {
        this.phoneNumber = res.phoneNumber;
        this.isGetPhonenumber = true;
        console.log(res);
      },
      err => console.log(err),
    );
  }

  getInviteOnMeeting() {
    if (this.user) {

      console.log(this.item);

      this._dataService.updateMeeting({
        id: this.item.id,
        members: this.item.members.concat({
          uid: this.user.uid,
          displayName: this.user.displayName,
          photoURL: this.user.photoURL,
          gameKitsCount: 0,
          comment: '',
        }),
      }).subscribe(
        res => console.log(res),
        err => console.log(err),
      );
    } else {
      this._msgService.sendDialogEvent({
        type: EdialogEventType.OPEN_LOGIN,
        text: `Для участия во встречи пожалуйста авторизуйтесь`,
      });
    }
  }

  deleteInviteOnMeeting() {
    this._dataService.updateMeeting({
      id: this.item.id,
      members: this.item.members.filter(p => p.uid !== this.user.uid),
    }).subscribe(
      res => console.log(res),
      err => console.log(err),
    );
  }
}
