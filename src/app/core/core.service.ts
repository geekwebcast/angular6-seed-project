import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/core/core-models/user';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';


@Injectable()
export class CoreService { 
private currentUserSubject = new BehaviorSubject<User>({} as User);
public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
public isAuthenticated = this.isAuthenticatedSubject.asObservable();
constructor(private httpClient: HttpClient) {
this.populate();
}

login(loginData) {
  return this.httpClient.post("login", loginData);
}

populate() {
    // If JWT detected, attempt to get & store user's info
    var token=localStorage.getItem('token');
    if (token) {
      this.httpClient.get('/user')
      .subscribe(
       (data:any) => this.setAuth(data),
        err => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    // this.jwtService.saveToken(user.token);
    localStorage.setItem('token', user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    // this.jwtService.destroyToken();
  localStorage.removeItem('token');
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }
 
  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
  // Update the user on the server (email, pass, etc)
// update(user){
//     return this.httpClient
//     .put('/user', { user })
//     .pipe(map(data => {
//       // Update the currentUser observable
//       this.currentUserSubject.next(data.user);
//       return data.user;
//     }));
//   }

}