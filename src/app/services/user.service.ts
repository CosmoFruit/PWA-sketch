import { Injectable }           from '@angular/core';
import { AngularFireAuth }      from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { switchMap }            from 'rxjs/operators';


export interface IUser {
  uid?: string | null;
  displayName: string | null;
  photoURL: string | null;
}


export interface IUserInfo extends IUser {
  phoneNumber: string;
  email: string;
  emailVerified: boolean;
}


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private afAuth: AngularFireAuth) {
  }

  user$: Observable<IUserInfo> = this.afAuth.user;

  getUserInfo() {
    return this.afAuth.auth.currentUser;
  }

  updateProfile(data: IUser): Observable<any> {
    const user = this.getUserInfo();

    return of(1).pipe(
      switchMap(() => from(user.updateProfile({
        displayName: data.displayName,
        photoURL: data.photoURL
      })))
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
