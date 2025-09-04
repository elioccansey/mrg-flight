import { Injectable, inject, signal, computed } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  private userSignal = signal<User | null>(null);
  private authResolved = signal(false);

  readonly isLoggedIn = computed(() => !!this.userSignal());
  readonly isAuthResolved = this.authResolved.asReadonly();

  constructor() {
    this.auth.onAuthStateChanged(
      user => {
        this.userSignal.set(user);
        this.authResolved.set(true);
      },
      err => {
        this.userSignal.set(null);
        this.authResolved.set(true);
      }
    );
  }

  login(email: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(cred => {
        this.userSignal.set(cred.user);
        return cred.user;
      });
  }

  logout(): Promise<void> {
    return signOut(this.auth).then(() => {
      this.userSignal.set(null);
      this.router.navigate(['/login']);
    });
  }

  register(email: string, password: string): Promise<User> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(cred => {
        this.userSignal.set(cred.user);
        return cred.user;
      });
  }

  signInWithGoogle(): Promise<User> {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(cred => {
        this.userSignal.set(cred.user);
        return cred.user;
      });
  }

  get user() {
    return this.userSignal.asReadonly();
  }
}