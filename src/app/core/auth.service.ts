import { Injectable, Inject } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {Auth} from '../domain/entities';

@Injectable()
export class AuthService {

  constructor(@Inject('user') private userService) { }

  loginWithCredentials(username: string, password: string): Promise<Auth> {
    return this.userService.findUser(username).then(user => {
      let auth = new Auth();
      let redirectUrl = localStorage.getItem('redirectUrl');
      localStorage.removeItem('userId');
      if (redirectUrl === null) redirectUrl = '/';
      auth.redirectUrl = redirectUrl;
      if (user === null) {
        auth.hasError = true;
        auth.errMsg = 'user not found';
      } else if (user.password === password) {
        auth.user = Object.assign({}, user);
        auth.hasError = false;
        localStorage.setItem('userId', user.id);
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
