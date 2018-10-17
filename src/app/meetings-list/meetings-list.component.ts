import { Component, OnInit } from '@angular/core';
import { MeetingService }    from '../services/meeting.service';
import { shareReplay }       from 'rxjs/operators';


@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: [ './meetings-list.component.scss' ],
})
export class MeetingsListComponent implements OnInit {

  constructor(private _dataService: MeetingService) {
  }

  items$ = this._dataService.getMeetings().pipe(
    shareReplay(1)
  );

  ngOnInit() {
  }

}
