import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  recoverEmailAndPassword(email: string): Observable<any> {
    return new Observable<void>((observer) => {
      setTimeout(() => {
        if (email === 'error@gmail.com') {
          observer.error('email note found');
        }
        observer.next();
        observer.complete();
      }, 3000);
    });
  }

  login(email: string, password: string) {
    return new Observable<User>((observer) => {
      setTimeout(() => {
        if (email === 'error@gmail.com') {
          observer.error('email note found');
          observer.next();
        } else {
          const user = new User();
          user.email = 'email@gmail.com';
          user.id = 'password';
          observer.next(user);
        }
        observer.complete();
      }, 300);
    });
  }
}
