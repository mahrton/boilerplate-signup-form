import {
  emailValidator,
  emailVerifyValidator,
  passwordValidator,
  passwordVerifyValidator,
  requiredValidator
} from "./validators";
import {UntypedFormControl} from "@angular/forms";

describe('Validators', () => {
  describe('requiredValidator', () => {
    it('should return false when form control has no value', () => {
      expect(new UntypedFormControl(null, requiredValidator()).valid).toBeFalse();
    });

    it('should return false when form control has empty string as value', () => {
      expect(new UntypedFormControl('', requiredValidator()).valid).toBeFalse();
    });

    it('should return true when form control has 0 as value', () => {
      expect(new UntypedFormControl(0, requiredValidator()).valid).toBeTrue();
    });

    it('should return true when form control has a number value', () => {
      expect(new UntypedFormControl(-243562.3464235, requiredValidator()).valid).toBeTrue();
    });
  });

  describe('emailValidator', () => {
    it('should return false when form control has null as value', () => {
      expect(new UntypedFormControl(null, emailValidator()).valid).toBeFalse();
    });

    it('should return false when form control has empty string as value', () => {
      expect(new UntypedFormControl('', emailValidator()).valid).toBeFalse();
    });

    it('should return false when form control has plain string as value', () => {
      expect(new UntypedFormControl('aaa', emailValidator()).valid).toBeFalse();
    });

    it('should return true when form control has no dot in email', () => {
      expect(new UntypedFormControl('aaa@bbb', emailValidator()).valid).toBeTrue();
    });

    it('should return true when form control has dot in email', () => {
      expect(new UntypedFormControl('aaa@bbb.ccc', emailValidator()).valid).toBeTrue();
    });
  });

  describe('emailVerifyValidator', () => {
    it('should return false when email is null and email verify control is also null', () => {
      const emailControl = new UntypedFormControl(null);
      expect(new UntypedFormControl(null, emailVerifyValidator(emailControl)).valid).toBeFalse();
    });

    it('should return false when email is valid and email verify control is null', () => {
      const emailControl = new UntypedFormControl('aaa@bbb.ccc');
      expect(new UntypedFormControl(null, emailVerifyValidator(emailControl)).valid).toBeFalse();
    });

    it('should return true even if email is invalid but it is the same as the validator', () => {
      const emailControl = new UntypedFormControl('aaa');
      expect(new UntypedFormControl('aaa', emailVerifyValidator(emailControl)).valid).toBeTrue();
    });

    it('should return true if email is valid but it is not the same as the validator', () => {
      const emailControl = new UntypedFormControl('aaa@bbb.ccc');
      expect(new UntypedFormControl('aaa@bbb', emailVerifyValidator(emailControl)).valid).toBeFalse();
    });

    it('should return true even if there are leading and trailing whitespace differences', () => {
      const emailControl = new UntypedFormControl(' aaa@bbb.ccc    ');
      expect(new UntypedFormControl('          aaa@bbb.ccc ', emailVerifyValidator(emailControl)).valid).toBeTrue();
    });
  });

  describe('passwordValidator', () => {
    it('should return false when password control has null as value', () => {
      const firstNameControl = new UntypedFormControl('Ludmilla');
      const lastNameControl = new UntypedFormControl('Macgregor');
      expect(new UntypedFormControl(null, passwordValidator(firstNameControl, lastNameControl)).valid).toBeFalse();
    });

    it('should return false when password control has empty string as value', () => {
      const firstNameControl = new UntypedFormControl('Ludmilla');
      const lastNameControl = new UntypedFormControl('Macgregor');
      expect(new UntypedFormControl('', passwordValidator(firstNameControl, lastNameControl)).valid).toBeFalse();
    });

    it('should return false when password control value is shorter than 8 character', () => {
      const firstNameControl = new UntypedFormControl('Ludmilla');
      const lastNameControl = new UntypedFormControl('Macgregor');
      expect(new UntypedFormControl('aaa', passwordValidator(firstNameControl, lastNameControl)).valid).toBeFalse();
    });

    it('should return false when password control value has no uppercase character', () => {
      const firstNameControl = new UntypedFormControl('Ludmilla');
      const lastNameControl = new UntypedFormControl('Macgregor');
      expect(new UntypedFormControl('aabbccdd', passwordValidator(firstNameControl, lastNameControl)).valid).toBeFalse();
    });

    it('should return false when password control value contains case insensitive first name', () => {
      const firstNameControl = new UntypedFormControl('Ludmilla');
      const lastNameControl = new UntypedFormControl('Macgregor');
      expect(new UntypedFormControl('ludmillaA', passwordValidator(firstNameControl, lastNameControl)).valid).toBeFalse();
    });

    it('should return false when password control value contains case insensitive last name', () => {
      const firstNameControl = new UntypedFormControl('Ludmilla');
      const lastNameControl = new UntypedFormControl('Macgregor');
      expect(new UntypedFormControl('macgregorA', passwordValidator(firstNameControl, lastNameControl)).valid).toBeFalse();
    });

    it('should return true when password control value is 8 characters and contains one upper case character', () => {
      const firstNameControl = new UntypedFormControl('Ludmilla');
      const lastNameControl = new UntypedFormControl('Macgregor');
      expect(new UntypedFormControl('aabbccdD', passwordValidator(firstNameControl, lastNameControl)).valid).toBeTrue();
    });

    it('should return true for any random password control value longer than 8 characters', () => {
      const firstNameControl = new UntypedFormControl('Ludmilla');
      const lastNameControl = new UntypedFormControl('Macgregor');
      expect(new UntypedFormControl('@#erg#$$@G sdsgERWDS ', passwordValidator(firstNameControl, lastNameControl)).valid).toBeTrue();
    });
  });


  describe('passwordVerifyValidator', () => {
    it('should return false when password is null and password verify control is also null', () => {
      const passwordControl = new UntypedFormControl(null);
      expect(new UntypedFormControl(null, passwordVerifyValidator(passwordControl)).valid).toBeFalse();
    });

    it('should return false when password is valid and password verify control is null', () => {
      const passwordControl = new UntypedFormControl('aabbccdD');
      expect(new UntypedFormControl(null, passwordVerifyValidator(passwordControl)).valid).toBeFalse();
    });

    it('should return true even if password is invalid but it is the same as the validator', () => {
      const passwordControl = new UntypedFormControl('aaa');
      expect(new UntypedFormControl('aaa', passwordVerifyValidator(passwordControl)).valid).toBeTrue();
    });

    it('should return true if password is valid but it is not the same as the validator', () => {
      const passwordControl = new UntypedFormControl('aabbccdD');
      expect(new UntypedFormControl('aabbccdd', passwordVerifyValidator(passwordControl)).valid).toBeFalse();
    });

    it('should return true even if there are leading and trailing whitespace differences', () => {
      const passwordControl = new UntypedFormControl(' aabbccdD  ');
      expect(new UntypedFormControl('     aabbccdD ', passwordVerifyValidator(passwordControl)).valid).toBeTrue();
    });
  });

});
