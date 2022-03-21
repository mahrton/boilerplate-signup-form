import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {TranslationKey} from "../../../shared/types";

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.css']
})
export class PasswordFieldComponent {
  @Input() control = new FormControl();
  @Input() title: TranslationKey | null = null;
}
