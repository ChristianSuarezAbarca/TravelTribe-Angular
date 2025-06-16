import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces/user';
import { AbstractControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { phoneNumberValidator } from '../../shared/validators/phoneNumber.validator';
import { uniqueValidator } from '../../shared/validators/unique.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../shared/services/user.service';
import { TravelsCardComponent } from '../../travels/travels-card/travels-card.component';
import { Travel } from '../../shared/interfaces/travel';
import { TravelsPageComponent } from '../../travels/travels-page/travels-page.component';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64.directive';
declare var bootstrap: any;

@Component({
	selector: 'profile',
	imports: [MenuComponent, ValidationClassesDirective, ReactiveFormsModule, FormsModule, TravelsCardComponent, EncodeBase64Directive],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss'
})
export class ProfileComponent extends TravelsPageComponent implements OnInit {
	#authService = inject(AuthService);
	#userService = inject(UserService);
	#fb = inject(NonNullableFormBuilder);
	#destroyRef = inject(DestroyRef);
	user = computed<User | null>(() => this.#authService.getUser());
	savedTravels = signal<Travel[]>([]);
	interactionsTravels = signal<{ travel: Travel, type: string }[]>([]);
	avatar = '';

	constructor() {
		super();
		effect(() => {
			if (!this.user()!.travelInteractions) {
				this.savedTravels.set([]);
				this.interactionsTravels.set([]);
				return;
			}

			const savedIds = this.user()!.travelInteractions!.filter(i => i.type === 'saved').map(i => i.travel);
			const savedTravels = this.allTravels().filter(travel => savedIds.includes(travel._id!));
			this.savedTravels.set(savedTravels);

			const interactionTravels = this.user()!.travelInteractions!
				.map(interaction => {
					const foundTravel = this.allTravels().find(travel => travel._id === interaction.travel);
					if (!foundTravel) return null;
					return {
						travel: foundTravel,
						type: interaction.type
					};
				})
				.filter(Boolean) as { travel: Travel, type: string }[];

			this.interactionsTravels.set(interactionTravels);
		});
	}

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
			_id: this.user()!._id,
			banned: this.user()!.banned
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
			_id: this.user()!._id,
			banned: this.user()!.banned
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
		const user: User = {
			rol: this.user()!.rol,
			name: this.user()!.name,
			username: this.user()!.username,
			email: this.user()!.email,
			number: this.user()!.number,
			avatar: this.avatar,
			_id: this.user()!._id,
			banned: this.user()!.banned
		};
		this.#userService.changeData(user, "avatar")
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
