import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {EMAIL, EMAIL_VERIFY, PASSWORD, PASSWORD_VERIFY, REQUIRED} from "../../../global/validators";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    emailVerify: new FormControl(),
    password: new FormControl(),
    passwordVerify: new FormControl()
  })

  constructor() { }

  ngOnInit(): void {
    this.firstName.addValidators(REQUIRED);
    this.lastName.addValidators(REQUIRED);
    this.email.addValidators(EMAIL);
    this.emailVerify.addValidators(EMAIL_VERIFY(this.email));
    this.password.addValidators(PASSWORD(this.firstName, this.lastName));
    this.passwordVerify.addValidators(PASSWORD_VERIFY(this.password));
  }

  get firstName() {
    return this.signUpForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.signUpForm.get('lastName') as FormControl;
  }

  get email() {
    return this.signUpForm.get('email') as FormControl;
  }

  get emailVerify() {
    return this.signUpForm.get('emailVerify') as FormControl;
  }

  get password() {
    return this.signUpForm.get('password') as FormControl;
  }

  get passwordVerify() {
    return this.signUpForm.get('passwordVerify') as FormControl;
  }

  submit() {

  }
}
