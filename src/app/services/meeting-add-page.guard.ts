import { Injectable }                      from '@angular/core';
import { CanActivate, Router }             from '@angular/router';
import { UserService }                     from './user.service';
import { EdialogEventType, NotifyService } from './notify.service';


@Injectable({
  providedIn: 'root',
})
export class MeetingAddPageGuard implements CanActivate {

  constructor(private _userService: UserService,
              private _msgService: NotifyService,
              private _router: Router) {
  }

  canActivate() {
    if (this._userService.getUserInfo()) {
      return true;
    } else {
      this._msgService.sendDialogEvent({
        type: EdialogEventType.OPEN_LOGIN,
        text: `Для создание встречи пожалуйста авторизуйтесь`
      });
      this._router.navigate(['/']);
      return false;
    }
  }

}
