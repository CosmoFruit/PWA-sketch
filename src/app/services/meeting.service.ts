import { Injectable }           from '@angular/core';
import { AngularFirestore }     from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { IUser }                from './user.service';
import { switchMap }            from 'rxjs/operators';

export interface IMeeting {
  id?: string;
  city: string
  address: string;
  time: Date;
  author: IUser;
  comment: string;
  gameKitsCount: number;
  members: IMeetingMember[];
}

export  interface IMeetingMember extends IUser {
  gameKitsCount: number;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor( private db: AngularFirestore, ) { }

  private itemsCollection = this.db.collection<IMeeting>('meetings');

  getMeetings(): Observable<IMeeting[]> {
    return this.itemsCollection.valueChanges();
  }

  addMeeting(data: IMeeting): Observable<any>  {
    return of(1).pipe(
      switchMap(() => this.itemsCollection.add({...data}))
    );
  }

  getMeeting(id: string): Observable<any> {
    return this.itemsCollection.doc(id).get();
  }

  updateMeeting(data: IMeeting): Observable<any> {
    return from(this.itemsCollection.doc(data.id).update(data));
  }
}
