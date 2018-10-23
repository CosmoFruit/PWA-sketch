import { Injectable }                                           from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection }         from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, from, Observable, of } from 'rxjs';
import { IUser }                                                from './user.service';
import { exhaustMap, map, switchMap }                           from 'rxjs/operators';
import * as firebase                                            from 'firebase/app';


export interface IMeeting {
  id?: string;
  city?: string;
  address?: string;
  timeStamp?: Date | number | {
    seconds?: number
  };
  date?: string;
  time?: string;
  author?: IUser;
  comment?: string;
  gameKitsCount?: number;
  members?: IMeetingMember[];
  isCanceled?: boolean;
  isAhead?: boolean;
}


export interface IMeetingMember extends IUser {
  gameKitsCount?: number;
  comment?: string;
}


export enum EmeetingFilters {
  AHEAD,
  OLD
}


@Injectable({
  providedIn: 'root',
})
export class MeetingService {

  constructor(private db: AngularFirestore) {
  }

  private itemsCollection = this.db.collection<IMeeting>('meetings', ref => {
        const nowDate = new Date();

        return ref.where('timeStamp', '>=', nowDate).orderBy('timeStamp', 'asc');
      });

  private itemsOldCollection = this.db.collection<IMeeting>('meetings', ref => {
    const nowDate = new Date();

    return ref.where('timeStamp', '<', nowDate).orderBy('timeStamp', 'desc');
  });

  getMeetings(): Observable<IMeeting[]> {
    return this.itemsCollection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as IMeeting;

            if (data.timeStamp) {
              data.timeStamp = (data.timeStamp as firebase.firestore.Timestamp).toMillis();
            }

            data.isAhead = true;

            const id = action.payload.doc.id;

            return { id, ...data };
          });
        }),
      );
  }


  getOldMeetings(): Observable<IMeeting[]> {
    return this.itemsOldCollection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as IMeeting;

            if (data.timeStamp) {
              data.timeStamp = (data.timeStamp as firebase.firestore.Timestamp).toMillis();
            }

            data.isAhead = false;

            const id = action.payload.doc.id;

            return { id, ...data };
          });
        }),
      );
  }

  addMeeting(data: IMeeting): Observable<any> {
    return of(1).pipe(
      switchMap(() => from(this.itemsCollection.add({ ...data }))),
    );
  }

  getMeeting(id: string): Observable<any> {
    return this.itemsCollection.doc(id).get();
  }

  updateMeeting(data: IMeeting): Observable<any> {
    console.log(data);

    return of(1).pipe(
      switchMap(() => from(this.itemsCollection.doc(data.id).update({ ...data }))),
    );
  }
}
