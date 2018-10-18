import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MeetingService }                                  from '../services/meeting.service';
import { shareReplay }                                     from 'rxjs/operators';
import { IUser, UserService }                              from '../services/user.service';
import { Subscription }                                    from 'rxjs';


@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: [ './meetings-list.component.scss' ],
})
export class MeetingsListComponent implements OnInit, OnDestroy {

  constructor(private _dataService: MeetingService,
              private _userService: UserService,
              private _cd: ChangeDetectorRef) {
  }

  items$ = this._dataService.getMeetings().pipe(
    shareReplay(1),
  );

  person: IUser;

  loading = true;

  private _subscriptions: Subscription[] = [];

  ngOnInit() {
    this._subscriptions = [
      this.items$.subscribe(() => this.loading = false),
      this._userService.user$.subscribe(res => {
        this.person = res;
      }),
    ];
  }

  ngOnDestroy() {
    this._subscriptions.forEach( x => x.unsubscribe());
  }

}
