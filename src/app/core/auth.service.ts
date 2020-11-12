import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  public loginWithCredentials(username: string, password: string): boolean {
    return username === 'andy';
  }
}
