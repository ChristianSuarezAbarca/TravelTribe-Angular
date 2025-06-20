import { Component, DestroyRef, inject } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { User, UserLogin } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { uniqueValidator } from '../../shared/validators/unique.validator';
import { phoneNumberValidator } from '../../shared/validators/phoneNumber.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
declare var bootstrap: any;

@Component({
	selector: 'login',
	imports: [ReactiveFormsModule, ValidationClassesDirective],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	#fb = inject(NonNullableFormBuilder);
	#authService = inject(AuthService);
	#router = inject(Router);
	#destroyRef = inject(DestroyRef);

	loginForm = this.#fb.group({
		usernameOrEmail: ['', Validators.required],
		password: ['', [Validators.required, Validators.minLength(8)]],
	});

	registerForm = this.#fb.group({
		name: ['', Validators.required],
		username: ['', {
			validators: [Validators.required],
			asyncValidators: [uniqueValidator('username', this.#authService)],
			updateOn: 'blur'
		}],
		email: ['', {
			validators: [Validators.required, Validators.email],
			asyncValidators: [uniqueValidator('gmail', this.#authService)],
			updateOn: 'blur'
		}],
		number: ['', {
			validators: [Validators.required, phoneNumberValidator()],
			asyncValidators: [uniqueValidator('number', this.#authService)],
			updateOn: 'blur'
		}],
		passwordGroup: this.#fb.group(
			{
				password: ['', [Validators.required, Validators.minLength(8)]],
				confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
			},
			{ validators: this.passwordMatch }
		)
	});

	sendLogin() {
		const user: UserLogin = { ...this.loginForm.getRawValue() };
		this.#authService.login(user)
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe({
				next: () => {
					this.#router.navigate(['/travels']);
				},
				error: () => {
					const modalLoginError = document.getElementById('modalLoginError');
					const modal = new bootstrap.Modal(modalLoginError);
					modal.show();
				}
			});
	}

	sendRegister() {
		const user: User = {
			...this.registerForm.getRawValue(),
			password: this.registerForm.get("passwordGroup")!.get("password")!.value,
			rol: '',
			banned: false
		};
		this.#authService.register(user)
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe({
				next: () => {
					const modalRegister = document.getElementById('modalRegister');
					const modal = new bootstrap.Modal(modalRegister);
					modal.show();
				}
			});

	}

	passwordMatch(c: AbstractControl): ValidationErrors | null {
		const password = c.get('password')?.value;
		const confirmPassword = c.get('confirmPassword')?.value;
		return password === confirmPassword ? null : { match: true };
	}

	rotateLogin() {
		const flipCard = document.getElementById('flipCard')! as HTMLElement;
		flipCard.style.transform = 'rotateY(180deg)';
	}

	rotateRegister() {
		const flipCard = document.getElementById('flipCard')! as HTMLElement;
		flipCard.style.transform = 'rotateY(0deg)';
	}
}
