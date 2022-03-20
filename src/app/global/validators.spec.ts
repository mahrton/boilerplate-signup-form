import {requiredValidator} from "./validators";
import {FormControl} from "@angular/forms";

describe('Validators', () => {
  describe('requiredValidator', () => {
    it('should return false when form control has no value', () => {
      expect(new FormControl(null, requiredValidator()).valid).toBeFalse();
    });
  });
});
