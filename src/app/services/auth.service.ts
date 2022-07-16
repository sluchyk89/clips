import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import IUser from "../models/user.model";
import {delay, Observable, of} from "rxjs";
import {filter, map, switchMap} from "rxjs/operators";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  private redirect = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.userCollection = this.db.collection('users');
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    )
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.route.firstChild),
      switchMap(route => route?.data ?? of({}))
    ).subscribe((data) => {
      this.redirect = data.authOnly ?? false
    })
  }

  public async createUser(userData: IUser) {

    if (!userData.password) {
      throw Error('Password not provided!')
    }

    let userCred = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password);

    if (!userCred.user) {
      throw Error("User can't be found!");
    }
    await this.userCollection.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    })

    await userCred.user.updateProfile({
      displayName: userData.name
    })

  }

  public async logout($event?: Event) {
    if ($event) {
      $event.preventDefault();
    }
    await this.afAuth.signOut();
    if (this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }
}
