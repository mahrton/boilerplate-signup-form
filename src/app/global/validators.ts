import {AbstractControl, FormControl, ValidationErrors, Validators} from "@angular/forms";
import {trim, toLower} from 'lodash';

export const REQUIRED: Array<(control: AbstractControl) => ValidationErrors | null> = [Validators.required]
export const EMAIL: Array<(control: AbstractControl) => ValidationErrors | null> = [Validators.required, Validators.email]
export const EMAIL_VERIFY = (emailControl: FormControl): Array<(control: AbstractControl) => ValidationErrors | null> => [
  Validators.required,
  (emailVerifyControl: AbstractControl): ValidationErrors | null => {
    if(trim('' + emailControl.value) != trim('' + emailVerifyControl.value)) {
      return {emailP_verify: false}
    }
    return null;
  }
];

export const PASSWORD = (firstNameControl: FormControl, lastNameControl: FormControl): Array<(control: AbstractControl) => ValidationErrors | null> => [
  Validators.required,
  Validators.minLength(8),
  Validators.pattern(/[a-z]/),
  Validators.pattern(/[A-Z]/),
  (passwordControl: AbstractControl): ValidationErrors | null => {
    const firstName: string = toLower(trim('' + firstNameControl.value));
    const lastName: string = toLower(trim('' + lastNameControl.value));
    const password: string = toLower(trim('' + passwordControl.value));
    if(password.includes(firstName) || password.includes(lastName)) {
      return {name: false}
    }
    return null;
  }
];

export const PASSWORD_VERIFY = (passwordControl: FormControl): Array<(control: AbstractControl) => ValidationErrors | null> => [
  Validators.required,
  (passwordVerifyControl: AbstractControl): ValidationErrors | null => {
    if(trim('' + passwordControl.value) != trim('' + passwordVerifyControl.value)) {
      return {password_verify: false}
    }
    return null;
  }
];
