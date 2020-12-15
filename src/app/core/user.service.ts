import { Injectable } from '@angular/core';
// import { Http, Headers, Response } from '@angular/http';
import {Http} from '../util/fakeHttp';

import 'rxjs/add/operator/toPromise';
import {User} from '../domain/entities';

@Injectable()
export class UserService {

  private api_url = 'api/users';
  constructor(private http: Http) { }

  findUser(username: string): Promise<User> {
    const url = `${this.api_url}?username=${username}`;
    return this.http.get(url).then(res => {
      let users = res as User[];
      return new Promise(res => {
        res((users.length > 0) ? users[0] : null)
      });
    }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
