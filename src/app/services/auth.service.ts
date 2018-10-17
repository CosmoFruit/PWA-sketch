import { Injectable }      from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.auth.useDeviceLanguage();
  }

  private confirmationResult;

  login(phone: string, appVerifier) {
    this.afAuth.auth.signInWithPhoneNumber(phone, appVerifier)
      .then((res) => {
        console.log(res);
        this.confirmationResult = res;
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
      });
  }

  confirmLogin(sign) {
    this.confirmationResult.confirm(sign)
      .then((result) => {
        // User signed in successfully.
        console.log(result.user);
        // ...
      }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      console.log(error);
    });
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
