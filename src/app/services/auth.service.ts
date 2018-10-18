import { Injectable }           from '@angular/core';
import { AngularFireAuth }      from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { switchMap, tap }       from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.auth.useDeviceLanguage();
  }

  private confirmationResult;

  login(phone: string, appVerifier): Observable<any> {
    return of(1).pipe(
      switchMap(() => from(this.afAuth.auth.signInWithPhoneNumber(phone, appVerifier))),
      tap(res => {
        this.confirmationResult = res;
      }),
    );
  }

  confirmLogin(sign): Observable<any> {
    return of(1).pipe(
      switchMap(() =>
        from(this.confirmationResult.confirm(sign))
      ),
    );
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      // Sign-out successful.
      console.log('Sign-out successful');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }
}
