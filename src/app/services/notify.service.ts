import { Injectable }      from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export enum EdialogEventType {
  OPEN_LOGIN
}


export interface IdialogEvent {
  type: EdialogEventType | null;
  text: string | null;
}

export class DialogEventInitState implements  IdialogEvent {
  type = null;
  text = null;
}


@Injectable({
  providedIn: 'root',
})
export class NotifyService {

  constructor() {
  }

  snackBarMsg$ = new BehaviorSubject<string>('');
  dialogEvent$ = new BehaviorSubject<IdialogEvent>(new DialogEventInitState);

  showSnackbar(msg: string) {
    this.snackBarMsg$.next(msg);
  }

  sendDialogEvent(event: IdialogEvent) {
    this.dialogEvent$.next(event);
  }
}
