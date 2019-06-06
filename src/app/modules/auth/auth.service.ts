import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewUser } from './models/newuser.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiPath = 'https://life-saver.herokuapp.com';
  // apiPath = 'http://localhost:3000';

  authToken = new BehaviorSubject<string>(null);
  userDetails = new BehaviorSubject<object>(null);

  headers = new Headers();

  registerUser(newUser: NewUser) {
    console.log(newUser);
    return this.http.post(`${this.apiPath}/users/create`, newUser, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  loginUser (user: {email: string, password: string}) {
    console.log(user);
    return this.http.post(`${this.apiPath}/users/login`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  logout () {
    console.log(`${`Bearer ` + this.getToken()}`);
    return this.http.post(`${this.apiPath}/logout`, '', {responseType: 'text',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`  // later get this token from store
      })
    });
  }

  logoutAll () {
    console.log(`${`Bearer ` + this.getToken()}`);
    return this.http.post(`${this.apiPath}/logoutAll`, '', {responseType: 'text',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`  // later get this token from store
      })
    });
  }

  getToken () {
    let token;
    this.authToken.subscribe(t => token = t);
    return token;
  }

}
