import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MeetingService }                                  from '../services/meeting.service';
import { shareReplay, switchMap }                          from 'rxjs/operators';
import { IUser, UserService }                              from '../services/user.service';
import { Subscription }                                    from 'rxjs';
import { ActivatedRoute }                                  from '@angular/router';


@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: [ './meetings-list.component.scss' ],
})
export class MeetingsListComponent implements OnInit, OnDestroy {

  constructor(private _dataService: MeetingService,
              private _userService: UserService,
              private _cd: ChangeDetectorRef,
              private route: ActivatedRoute, ) {
  }

  items$ = this._dataService.getMeetings().pipe(
    shareReplay(1),
  );

  person: IUser;

  loading = true;

  private _subscriptions: Subscription[] = [];

  ngOnInit() {
    this._subscriptions = [
      this.route.queryParams.
      pipe(
        switchMap(options => {
          const filter = options['filter'];
          console.log(filter);
          this.loading = true;

          if (filter === 'old') {
            return this.items$ = this._dataService.getOldMeetings().pipe(
              shareReplay(1),
            );
          } else {
            return this.items$ = this._dataService.getMeetings().pipe(
              shareReplay(1),
            );
          }
        })
      ).subscribe(options => {
        this.loading = false
      }),

      this._userService.user$.subscribe(res => {
        this.person = res;
      }),
    ];
  }

  ngOnDestroy() {
    this._subscriptions.forEach( x => x.unsubscribe());
  }

}
