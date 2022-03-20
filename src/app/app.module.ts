import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordFieldComponent } from './components/fields/password-field/password-field.component';
import { TextFieldComponent } from './components/fields/text-field/text-field.component';
import { EmailFieldComponent } from './components/fields/email-field/email-field.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "./components/global/header/header.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { FooterComponent } from './components/global/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    PasswordFieldComponent,
    TextFieldComponent,
    EmailFieldComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
