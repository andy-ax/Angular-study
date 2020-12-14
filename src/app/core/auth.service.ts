import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Auth} from '../domain/entities';

@Injectable()
export class AuthService {

  constructor(private http: Http, @Inject('user') private userService) { }

  loginWithCredentials(username: string, password: string): Promise<Auth> {
    return this.userService.findUser(username).then(user => {
      let auth = new Auth();
      localStorage.removeItem(('userId'));
      let redirectUrl = localStorage.getItem('redirectUrl');
      if (redirectUrl === null) redirectUrl = '/';
      auth.redirectUrl = redirectUrl;
      if (user === null) {
        auth.hasError = true;
        auth.errMsg = 'user not found';
      } else if (user.password === password) {
        auth.user = Object.assign({}, user);
        auth.hasError = false;
      } else {
        auth.hasError = true;
        auth.errMsg = 'password not match';
      }

      return auth;
    }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
