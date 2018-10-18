import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IMeeting }                            from '../services/meeting.service';
import { IUser }                               from '../services/user.service';


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

  constructor() {}

  ngOnInit() {

  }

  ngOnChanges () {
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
}
