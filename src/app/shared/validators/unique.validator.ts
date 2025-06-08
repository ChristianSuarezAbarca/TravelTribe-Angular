import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function uniqueValidator(field: string, authService: AuthService): AsyncValidatorFn {
	return (control: AbstractControl): ReturnType<AsyncValidatorFn> => {
		const value = control.value;

		if (!value) {
			return of(null);
		}

		return authService.checkFieldUnique(value, field).pipe(
			map(exists => (exists ? { [`${field}Taken`]: true } : null)),
			catchError(() => of(null))
		);
	};
}
