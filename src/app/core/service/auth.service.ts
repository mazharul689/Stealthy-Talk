import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, Subject, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ok } from 'assert';
import { ApiService } from 'src/app/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  authToken: any;
  user: any;
  tokenSubscription = new Subscription()
  timeout: any;
  getVar: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  login(username: string, password: string) {
    return this.http.post<any>('http://localhost/stego_image/login.php', { username, password }).pipe(map((user) => {
      user.role = 'Admin'
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
    // this.apiService.login(username, password).pipe(map((data) => {
    //   console.log(data)
    //   data.role = 'Admin'
    //   // store user details and jwt token in local storage to keep user logged in between page refreshes
    //   localStorage.setItem('currentUser', JSON.stringify(data));
    //   this.currentUserSubject.next(data);
    //   // console.log('user', user)
    //   return data;
    // })
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    window.localStorage.clear()
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
}
