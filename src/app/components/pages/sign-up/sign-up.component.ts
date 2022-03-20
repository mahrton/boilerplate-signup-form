import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {
  emailValidator,
  emailVerifyValidator,
  passwordValidator,
  passwordVerifyValidator,
  requiredValidator
} from "../../../global/validators";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  firstName = new FormControl(requiredValidator());
  lastName = new FormControl(requiredValidator());
  email = new FormControl(emailValidator());
  emailVerify = new FormControl(emailVerifyValidator(this.email));
  password = new FormControl(passwordValidator(this.firstName, this.lastName));
  passwordVerify = new FormControl(passwordVerifyValidator(this.password));
  signUpForm: FormGroup = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    emailVerify: this.emailVerify,
    password: this.password,
    passwordVerify: this.passwordVerify
  });

  constructor() { }

  submit() {
    if (this.signUpForm.valid) {
      // will submit
    } else {
      // won't submit until it is valid
    }
  }
}
