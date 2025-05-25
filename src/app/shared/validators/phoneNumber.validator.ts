import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
	const phonePattern = /^[0-9+\s]{9,16}$/;
	return (control: AbstractControl): ValidationErrors | null => {
		if (control.value && !phonePattern.test(control.value)) {
			return { invalidPhoneNumber: true };
		}
		return null;
	};
}
