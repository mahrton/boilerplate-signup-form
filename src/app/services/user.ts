import {get} from 'lodash';

export interface IUserSignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class UserSignUpRequest implements IUserSignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(data: object) {
    this.firstName = get(data, 'firstName');
    this.lastName = get(data, 'lastName');
    this.email = get(data, 'email');
    this.password = get(data, 'password');
  }
}


export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
}
