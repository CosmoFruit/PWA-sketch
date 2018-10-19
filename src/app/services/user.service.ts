import { Injectable }           from '@angular/core';
import { AngularFireAuth }      from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { switchMap, tap }       from 'rxjs/operators';
import { AngularFirestore }     from '@angular/fire/firestore';
import { IMeeting }             from './meeting.service';


export interface IUser {
  uid?: string | null;
  isOnline?: boolean;
  displayName: string | null;
  photoURL: string | null;
}


export interface IUserInfo extends IUser {
  phoneNumber?: string;
  email?: string;
  emailVerified?: boolean;
}


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore) {
  }

  user$: Observable<IUserInfo> = this.afAuth.user;
  private usersCollection = this.db.collection<IUserInfo>('users');

  getUserbyUid(user: IUserInfo): Observable<IUserInfo> {
    return of(1).pipe(
      switchMap( () => from(this.usersCollection.doc<IUserInfo>(user.uid).valueChanges()))
    )
  }

  updateUserbyUid(user: IUserInfo): Observable<void> {
    return of(1).pipe(
      switchMap( () => from(this.usersCollection.doc(user.uid).set(user)))
    )
  }

  getUserInfo() {
    return this.afAuth.auth.currentUser;
  }

  updateProfile(data: IUser): Observable<any> {
    const user = this.getUserInfo();

    return of(1).pipe(
      switchMap(() => from(user.updateProfile({
        displayName: data.displayName,
        photoURL: data.photoURL
      }))),
      tap(() => this.updateUserbyUid({
        uid: data.uid,
        displayName: data.displayName,
        photoURL: data.photoURL
      }))
    );
  }

  updateEmail(email: string): Observable<any> {
    const user = this.getUserInfo();

    return of(1).pipe(
      switchMap(() => from(user.updateEmail(email)))
    );
  }

  // TO DO
  // updatePhone(phone: string): Observable<any> {
  //   const user = this.getUserInfo();
  //
  //   return of(1).pipe(
  //     switchMap(() => from(user.updatePhoneNumber({})))
  //   );
  // }

}
