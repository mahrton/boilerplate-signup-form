import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignUpComponent} from './sign-up.component';
import {AppModule} from "../../../app.module";
import {By} from "@angular/platform-browser";

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [
        AppModule
      ]
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
});
