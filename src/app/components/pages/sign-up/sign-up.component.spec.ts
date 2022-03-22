import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignUpComponent} from './sign-up.component';
import {AppModule} from "../../../app.module";
import {By} from "@angular/platform-browser";
import {UserApiService} from "../../../services/user-api.service";
import SpyObj = jasmine.SpyObj;
import {of} from "rxjs";
import {UserSignUpRequest} from "../../../services/user";

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let mockUserApiService: SpyObj<UserApiService>;

  beforeEach(async () => {
    mockUserApiService = jasmine.createSpyObj(['createUser']);
    mockUserApiService.createUser.and.returnValue(of({
      firstName: 'aa',
      lastName: 'bb',
      email: 'aa@bb.cc'
    }));
    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [
        AppModule
      ],
      providers: [{
        provide: UserApiService,
        useValue: mockUserApiService
      }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 input fields', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs).toBeTruthy();
    expect(inputs.length).toBe(6);
  });

  it('should have enabled submit button', () => {
    const submit = fixture.debugElement.query(By.css('button'));
    expect(submit).toBeTruthy();
    expect(submit.nativeElement.attributes['ng-reflect-disabled'].value).toBe('false');
  });

  it('cannot submit half-filled form', () => {
    component.firstName.setValue('aaa');
    component.lastName.setValue('bbb');
    const submit = fixture.debugElement.query(By.css('button'));
    submit.nativeElement.dispatchEvent(new Event('click'));
    expect(component.notFinished).toBeTrue();
  });

  it('can only submit filled in and valid form', () => {
    component.firstName.setValue('aaa');
    component.lastName.setValue('bbb');
    component.email.setValue('aaa@bbb.ccc');
    component.emailVerify.setValue('aaa@bbb.ccc');
    component.password.setValue('aabbccdD');
    component.passwordVerify.setValue('aabbccdD');
    const submit = fixture.debugElement.query(By.css('button'));
    submit.nativeElement.dispatchEvent(new Event('click'));
    expect(mockUserApiService.createUser).toHaveBeenCalledWith(new UserSignUpRequest({
      firstName: 'aaa',
      lastName: 'bbb',
      email: 'aaa@bbb.ccc',
      password: 'aabbccdD'
    }));
  });

  it('cannot submit filled in but invalid form', () => {
    component.firstName.setValue('aaa');
    component.lastName.setValue('bbb');
    component.email.setValue('aaa@bbb.ccc');
    component.emailVerify.setValue('aaa@bbb');
    component.password.setValue('aabbccdD');
    component.passwordVerify.setValue('aabbcceE');
    const submit = fixture.debugElement.query(By.css('button'));
    submit.nativeElement.dispatchEvent(new Event('click'));
    expect(mockUserApiService.createUser).not.toHaveBeenCalled();
    expect(component.notFinished).toBeTrue();
  });
});
