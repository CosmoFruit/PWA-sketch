import { Component, Input, OnInit } from '@angular/core';
import { IMeeting }                 from '../services/meeting.service';

@Component({
  selector: 'app-meeting-snippet',
  templateUrl: './meeting-snippet.component.html',
  styleUrls: ['./meeting-snippet.component.scss']
})
export class MeetingSnippetComponent implements OnInit {

  @Input() item: IMeeting;

  constructor() { }

  ngOnInit() {
  }

}
