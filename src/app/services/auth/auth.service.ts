import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
