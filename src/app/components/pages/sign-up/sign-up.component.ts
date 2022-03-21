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
import {take} from "rxjs";
import {Router} from "@angular/router";

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

  constructor(private userApiService: UserApiService, private router: Router) { }

  submit() {
    if (this.signUpForm.valid) {
      this.userApiService
        .postUser(this.signUpForm.value as IUserSignUpRequest)
        .pipe(take(1))
        .subscribe({
          next: response => this.router.navigate(['/success']),
          error: () => this.error = true
        })
    } else {
      this.notFinished = true;
    }
  }
}
