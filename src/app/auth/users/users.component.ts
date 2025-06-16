import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { FormsModule } from '@angular/forms';
import { User } from '../../shared/interfaces/user';
import { UserService } from '../../shared/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'users',
	imports: [MenuComponent, FormsModule],
	templateUrl: './users.component.html',
	styleUrl: './users.component.scss'
})
export class UsersComponent {
	#usersService = inject(UserService);
	#destroyRef = inject(DestroyRef);
	searchTerm: string = '';
	users = signal<User[]>([]);
	allUsers = signal<User[]>([]);

	constructor() {
		this.#usersService.getUsers().pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe({
				next: (data) => {
					this.users.set(data);
					this.allUsers.set(data);
				}
			});
	}

	searchUser() {
		const term = this.searchTerm.toLowerCase().trim();

		if (!term) {
			this.users.set(this.allUsers());
		} else {
			this.users.set(this.allUsers().filter(user =>
				user.username.toLowerCase().includes(term) ||
				user.name?.toLowerCase().includes(term)
			));
		}
	}

	banUser(id: string | undefined) {
		this.#usersService.banUser(id).pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe();
	}
}
