import { Injectable }           from '@angular/core';
import { AngularFirestore }     from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { IUser }                from './user.service';
import { map, switchMap }       from 'rxjs/operators';

export interface IMeeting {
  id?: string;
  city: string;
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
    return this.itemsCollection.snapshotChanges()
      .pipe(
       map(actions => {
         return actions.map(action => {
           const data = action.payload.doc.data() as IMeeting;
           const id = action.payload.doc.id;

           return { id, ...data };
         });
       })
      );
  }

  addMeeting(data: IMeeting): Observable<any>  {
    return of(1).pipe(
      switchMap(() => from(this.itemsCollection.add({...data})))
    );
  }

  getMeeting(id: string): Observable<any> {
    return this.itemsCollection.doc(id).get();
  }

  updateMeeting(data: IMeeting): Observable<any> {
    console.log(data);

    return  of(1).pipe(
      switchMap(() => from(this.itemsCollection.doc(data.id).update({...data})))
    );
  }
}
