import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function uniqueValidator(field: string, authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): ReturnType<AsyncValidatorFn> => {
    const value = control.value;
    
    if (!value) {
      return of(null);
    }

    return timer(300).pipe(
      switchMap(() => authService.checkFieldUnique(value, field)),
      map(exists => (exists ? { [`${field}Taken`]: true } : null)),
      catchError(() => of(null))
    );
  };
}
