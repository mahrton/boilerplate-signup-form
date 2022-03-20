import {
  emailValidator,
  emailVerifyValidator,
  passwordValidator,
  passwordVerifyValidator,
  requiredValidator
} from "./validators";
import {FormControl} from "@angular/forms";

describe('Validators', () => {
  describe('requiredValidator', () => {
    it('should return false when form control has no value', () => {
      expect(new FormControl(null, requiredValidator()).valid).toBeFalse();
    });

    it('should return false when form control has empty string as value', () => {
      expect(new FormControl('', requiredValidator()).valid).toBeFalse();
    });

    it('should return true when form control has 0 as value', () => {
      expect(new FormControl(0, requiredValidator()).valid).toBeTrue();
    });

    it('should return true when form control has a number value', () => {
      expect(new FormControl(-243562.3464235, requiredValidator()).valid).toBeTrue();
    });
  });

  describe('emailValidator', () => {
    it('should return false when form control has null as value', () => {
      expect(new FormControl(null, emailValidator()).valid).toBeFalse();
    });

    it('should return false when form control has empty string as value', () => {
      expect(new FormControl('', emailValidator()).valid).toBeFalse();
    });

    it('should return false when form control has plain string as value', () => {
      expect(new FormControl('aaa', emailValidator()).valid).toBeFalse();
    });

    it('should return true when form control has no dot in email', () => {
      expect(new FormControl('aaa@bbb', emailValidator()).valid).toBeTrue();
    });

    it('should return true when form control has dot in email', () => {
      expect(new FormControl('aaa@bbb.ccc', emailValidator()).valid).toBeTrue();
    });
  });

  describe('emailVerifyValidator', () => {
    it('should return false when email is null and email verify control is also null', () => {
      const emailControl = new FormControl(null);
      expect(new FormControl(null, emailVerifyValidator(emailControl)).valid).toBeFalse();
    });

    it('should return false when email is valid and email verify control is null', () => {
      const emailControl = new FormControl('aaa@bbb.ccc');
      expect(new FormControl(null, emailVerifyValidator(emailControl)).valid).toBeFalse();
    });

    it('should return true even if email is invalid but it is the same as the validator', () => {
      const emailControl = new FormControl('aaa');
      expect(new FormControl('aaa', emailVerifyValidator(emailControl)).valid).toBeTrue();
    });

    it('should return true if email is valid but it is not the same as the validator', () => {
      const emailControl = new FormControl('aaa@bbb.ccc');
      expect(new FormControl('aaa@bbb', emailVerifyValidator(emailControl)).valid).toBeFalse();
    });

    it('should return true even if there are leading and trailing whitespace differences', () => {
      const emailControl = new FormControl(' aaa@bbb.ccc    ');
      expect(new FormControl('          aaa@bbb.ccc ', emailVerifyValidator(emailControl)).valid).toBeTrue();
    });
  });

  describe('passwordValidator', () => {
    it('should return false when password control has null as value', () => {
      const firstNameControl = new FormControl('Ludmilla');
      const lastNameControl = new FormControl('Macgregor');
      expect(new FormControl(null, passwordValidator(firstNameControl, lastNameControl)).valid).toBeFalse();
    });

    it('should return false when password control has empty string as value', () => {
      const firstNameControl = new FormControl('Ludmilla');
      const lastNameControl = new FormControl('Macgregor');
      expect(new FormControl('', passwordValidator(firstNameControl, lastNameControl)).valid).toBeFalse();
    });

    it('should return false when password control value is shorter than 8 character', () => {
      const firstNameControl = new FormControl('Ludmilla');
      const lastNameControl = new FormControl('Macgregor');
      expect(new FormControl('aaa', passwordValidator(firstNameControl, lastNameControl)).valid).toBeFalse();
    });

    it('should return false when password control value has no uppercase character', () => {
      const firstNameControl = new FormControl('Ludmilla');
      const lastNameControl = new FormControl('Macgregor');
      expect(new FormControl('aabbccdd', passwordValidator(firstNameControl, lastNameControl)).valid).toBeFalse();
    });

    it('should return false when password control value contains case insensitive first name', () => {
      const firstNameControl = new FormControl('Ludmilla');
      const lastNameControl = new FormControl('Macgregor');
      expect(new FormControl('ludmillaA', passwordValidator(firstNameControl, lastNameControl)).valid).toBeFalse();
    });

    it('should return false when password control value contains case insensitive last name', () => {
      const firstNameControl = new FormControl('Ludmilla');
      const lastNameControl = new FormControl('Macgregor');
      expect(new FormControl('macgregorA', passwordValidator(firstNameControl, lastNameControl)).valid).toBeFalse();
    });

    it('should return true when password control value is 8 characters and contains one upper case character', () => {
      const firstNameControl = new FormControl('Ludmilla');
      const lastNameControl = new FormControl('Macgregor');
      expect(new FormControl('aabbccdD', passwordValidator(firstNameControl, lastNameControl)).valid).toBeTrue();
    });

    it('should return true for any random password control value longer than 8 characters', () => {
      const firstNameControl = new FormControl('Ludmilla');
      const lastNameControl = new FormControl('Macgregor');
      expect(new FormControl('@#erg#$$@G sdsgERWDS ', passwordValidator(firstNameControl, lastNameControl)).valid).toBeTrue();
    });
  });


  describe('passwordVerifyValidator', () => {
    it('should return false when password is null and password verify control is also null', () => {
      const passwordControl = new FormControl(null);
      expect(new FormControl(null, passwordVerifyValidator(passwordControl)).valid).toBeFalse();
    });

    it('should return false when password is valid and password verify control is null', () => {
      const passwordControl = new FormControl('aabbccdD');
      expect(new FormControl(null, passwordVerifyValidator(passwordControl)).valid).toBeFalse();
    });

    it('should return true even if password is invalid but it is the same as the validator', () => {
      const passwordControl = new FormControl('aaa');
      expect(new FormControl('aaa', passwordVerifyValidator(passwordControl)).valid).toBeTrue();
    });

    it('should return true if password is valid but it is not the same as the validator', () => {
      const passwordControl = new FormControl('aabbccdD');
      expect(new FormControl('aabbccdd', passwordVerifyValidator(passwordControl)).valid).toBeFalse();
    });

    it('should return true even if there are leading and trailing whitespace differences', () => {
      const passwordControl = new FormControl(' aabbccdD  ');
      expect(new FormControl('     aabbccdD ', passwordVerifyValidator(passwordControl)).valid).toBeTrue();
    });
  });

});
