import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// interface IUser {
//   name: string;
//   lastName: string;
//   age: number;
// }


@Injectable()
export class UserService {

  private subject = new BehaviorSubject(undefined);
  constructor() { }

  setUser(token: string): void {
    this.subject.next(token);
  }

  getUser(){
    return this.subject.subscribe(console.log);
  }
}