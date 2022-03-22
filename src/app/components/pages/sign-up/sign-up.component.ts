import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {
  emailValidator,
  emailVerifyValidator,
  passwordValidator,
  passwordVerifyValidator,
  requiredValidator
} from "../../../shared/validators";
import {UserApiService} from "../../../services/user-api.service";
import {IUserSignUpRequest, UserSignUpRequest} from "../../../services/user";
import {Subject, take, takeUntil} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
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
  loading = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private userApiService: UserApiService, private router: Router) {}

  ngOnInit(): void {
        this.email.valueChanges
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => this.emailVerify.updateValueAndValidity({onlySelf: true}))
        this.password.valueChanges
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => this.passwordVerify.updateValueAndValidity({onlySelf: true}))
    }

  submit() {
    if (this.signUpForm.valid) {
      this.loading = true;
      this.userApiService
        .createUser(new UserSignUpRequest(this.signUpForm.value))
        .pipe(take(1))
        .subscribe({
          next: response => this.router.navigate(['/success']),
          error: () => {
            this.error = true;
            this.loading = false;
          }
        })
    } else {
      this.notFinished = true;
    }

  }
}
