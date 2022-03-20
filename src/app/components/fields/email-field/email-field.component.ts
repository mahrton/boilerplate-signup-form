import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {TranslationKey} from "../../../global/types";

@Component({
  selector: 'app-email-field',
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.css']
})
export class EmailFieldComponent {
  @Input() control = new FormControl();
  @Input() title: TranslationKey | null = null;
}
