import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces/user';
import { AbstractControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { phoneNumberValidator } from '../../shared/validators/phoneNumber.validator';
import { uniqueValidator } from '../../shared/validators/unique.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../shared/services/user.service';
declare var bootstrap: any;

@Component({
	selector: 'profile',
	imports: [MenuComponent, ValidationClassesDirective, ReactiveFormsModule, FormsModule],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
	#authService = inject(AuthService);
	#userService = inject(UserService);
	#fb = inject(NonNullableFormBuilder);
	#destroyRef = inject(DestroyRef);
	user = computed<User | null>(() => this.#authService.getUser());
	image = '';

	ngOnInit(): void {
		this.profileForm.patchValue({
			name: this.user()!.name,
			username: this.user()!.username,
			email: this.user()!.email,
			number: this.user()!.number
		})
	}

	profileForm = this.#fb.group({
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
		}]
	});

	changePasswordForm = this.#fb.group({
		passwordGroup: this.#fb.group(
			{
				password: ['', [Validators.required, Validators.minLength(8)]],
				confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
			},
			{ validators: this.passwordMatch }
		)
	});

	changeData() {
		const user: User = {
			...this.profileForm.getRawValue(),
			rol: this.user()!.rol,
			_id: this.user()!._id
		};
		this.#userService.changeData(user, "normal")
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe({
				next: () => {
					this.showModalSuccess();
				},
				error: () => {
					this.showModalError();
				}
			});
	}

	changePassword() {
		const user: User = {
			password: this.changePasswordForm.getRawValue().passwordGroup.password,
			rol: this.user()!.rol,
			name: this.user()!.name,
			username: this.user()!.username,
			email: this.user()!.email,
			number: this.user()!.number,
		};
		this.#userService.changeData(user, "password")
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe({
				next: () => {
					this.showModalSuccess();
				},
				error: () => {
					this.showModalError();
				}
			});
	}

	changeAvatar(event: Event) {
		event.preventDefault();
		console.log(this.image);
		const user: User = {
			rol: this.user()!.rol,
			name: this.user()!.name,
			username: this.user()!.username,
			email: this.user()!.email,
			number: this.user()!.number,
			avatar: this.image
		};
		bootstrap.Modal.getInstance(document.getElementById('modalImage')!).hide();
	}

	passwordMatch(c: AbstractControl): ValidationErrors | null {
		const password = c.get('password')?.value;
		const confirmPassword = c.get('confirmPassword')?.value;
		return password === confirmPassword ? null : { match: true };
	}

	showModalSuccess() {
		const modalChangeData = document.getElementById('modalChangeData');
		const modal = new bootstrap.Modal(modalChangeData);
		modal.show();
	}

	showModalError() {
		const modalChangeDataError = document.getElementById('modalChangeDataError');
		const modal = new bootstrap.Modal(modalChangeDataError);
		modal.show();
	}
}
