import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher }                                                   from '@angular/cdk/layout';
import { AngularFirestore }                                               from '@angular/fire/firestore';
import { Observable }                                                     from 'rxjs';
import { AngularFireAuth }                                                from '@angular/fire/auth';
import * as firebase                                                      from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private db: AngularFirestore,
              private afAuth: AngularFireAuth) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.afAuth.auth.useDeviceLanguage();
  }

  private itemsCollection = this.db.collection('meetings');
  items$: Observable<any[]>;
  user$ = this.afAuth.user;

  appVerifier;

  ngOnInit() {
    this.items$ = this.itemsCollection.valueChanges();

    this.items$.subscribe(data => console.log(data));
    this.user$.subscribe(data => {
      console.log(data);
    });
  }

  ngAfterViewInit() {
    this.appVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': function (response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log(response);
      },
    });

    console.log( this.appVerifier);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  login() {
    const phone = '+79214156777';

    this.afAuth.auth.signInWithPhoneNumber(phone, this.appVerifier)
      .then(function (confirmationResult) {
        console.log(confirmationResult);

        const sign = '123456';

        confirmationResult.confirm(sign)
          .then(function (result) {
            // User signed in successfully.
            console.log(result.user);
            // ...
          }).catch(function (error) {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log(error);
        });
      })
      .catch(function (error) {
        // Error; SMS not sent
        // ...
        console.log(error);
      });
  }

  logout() {
    this.afAuth.auth.signOut().then(function() {
      // Sign-out successful.
      console.log('Sign-out successful');
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });
  }

  updateUser() {
    const user = this.afAuth.auth.currentUser;

    user.updateProfile({displayName: 'Test Testing', photoURL: null})
      .then((res) =>  console.log(res))
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
      });
  }

  addItem(name: string) {
    this.itemsCollection.add(name);
  }

}
