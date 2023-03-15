import {AbstractControl, UntypedFormControl, ValidationErrors, Validators} from "@angular/forms";
import {trim, toLower} from 'lodash';

export const requiredValidator = (): Array<(control: AbstractControl) => ValidationErrors | null> => [Validators.required];
export const emailValidator = (): Array<(control: AbstractControl) => ValidationErrors | null> => [Validators.required, Validators.email];
export const emailVerifyValidator = (emailControl: UntypedFormControl): Array<(control: AbstractControl) => ValidationErrors | null> => [
  Validators.required,
  (emailVerifyControl: AbstractControl): ValidationErrors | null => {
    if(trim('' + emailControl.value) != trim('' + emailVerifyControl.value)) {
      return {email_verify: false}
    }
    return null;
  }
];

export const passwordValidator = (firstNameControl: UntypedFormControl, lastNameControl: UntypedFormControl): Array<(control: AbstractControl) => ValidationErrors | null> => [
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

export const passwordVerifyValidator = (passwordControl: UntypedFormControl): Array<(control: AbstractControl) => ValidationErrors | null> => [
  Validators.required,
  (passwordVerifyControl: AbstractControl): ValidationErrors | null => {
    if(trim('' + passwordControl.value) != trim('' + passwordVerifyControl.value)) {
      return {password_verify: false}
    }
    return null;
  }
];
