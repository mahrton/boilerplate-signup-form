import {Component, Input} from '@angular/core';
import {UntypedFormControl} from "@angular/forms";
import {TranslationKey} from "../../../shared/types";

@Component({
  selector: 'app-email-field',
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.css']
})
export class EmailFieldComponent {
  @Input() control = new UntypedFormControl();
  @Input() title: TranslationKey | null = null;
}
