import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {TranslationKey} from "../../../shared/types";

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent {
  @Input() control = new FormControl<String>("");
  @Input() title: TranslationKey | null = null;
}
