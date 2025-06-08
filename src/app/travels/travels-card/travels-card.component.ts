import { Component, computed, DestroyRef, inject, input, output } from '@angular/core';
import { Travel } from '../../shared/interfaces/travel';
import { TravelsService } from '../../shared/services/travels.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces/user';

@Component({
	selector: 'travels-card',
	imports: [RouterLink],
	templateUrl: './travels-card.component.html',
	styleUrl: './travels-card.component.scss'
})
export class TravelsCardComponent {
	#travelsService = inject(TravelsService);
	#authService = inject(AuthService);
	#destroyRef = inject(DestroyRef);
	travel = input.required<Travel>();
	deleted = output<string>();
	user = computed<User | null>(() => this.#authService.getUser());
	isLogged = computed<boolean>(() => this.#authService.getLogged());

	async deleteEvent(id: Travel['_id']): Promise<void> {
		// const confirmed = await this.openModal();
		// if (confirmed) {
		// 	this.#eventsService.deleteEvent(this.event().id!).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => this.deleted.emit(id!));
		// }
	}
}
