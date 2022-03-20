import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {
  emailValidator,
  emailVerifyValidator,
  passwordValidator,
  passwordVerifyValidator,
  requiredValidator
} from "../../../global/validators";
import {UserApiService} from "../../../services/user-api.service";
import {IUser, IUserSignUpRequest} from "../../../services/user";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  firstName = new FormControl(null, requiredValidator());
  lastName = new FormControl(null, requiredValidator());
  email = new FormControl(null, emailValidator());
  emailVerify = new FormControl(null, emailVerifyValidator(this.email));
  password = new FormControl(null, passwordValidator(this.firstName, this.lastName));
  passwordVerify = new FormControl(null, passwordVerifyValidator(this.password));
  signUpForm: FormGroup = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    emailVerify: this.emailVerify,
    password: this.password,
    passwordVerify: this.passwordVerify
  });
  notFinished = false;
  error = false;

  constructor(private userApiService: UserApiService) { }

  submit() {
    if (this.signUpForm.valid) {
      this.userApiService
        .postUser(this.signUpForm.value as IUserSignUpRequest)
        .subscribe({
          next: response => true,
          error: () => this.error = true
        })
    } else {
      this.notFinished = true;
    }
  }
}
