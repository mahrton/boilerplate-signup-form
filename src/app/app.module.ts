import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PasswordFieldComponent} from './components/fields/password-field/password-field.component';
import {TextFieldComponent} from './components/fields/text-field/text-field.component';
import {EmailFieldComponent} from './components/fields/email-field/email-field.component';
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {SignUpComponent} from './components/pages/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "./components/shared/header/header.component";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {FooterComponent} from './components/shared/footer/footer.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { SuccessComponent } from './components/pages/success/success.component';

// translations loader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    PasswordFieldComponent,
    TextFieldComponent,
    EmailFieldComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    SuccessComponent
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
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
          defaultLanguage: 'en'
        })
    ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
