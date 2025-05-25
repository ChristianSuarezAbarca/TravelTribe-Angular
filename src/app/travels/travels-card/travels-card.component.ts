import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { Travel } from '../../shared/interfaces/travel';
import { TravelsService } from '../../shared/services/travels.service';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'travels-card',
	imports: [RouterLink],
	templateUrl: './travels-card.component.html',
	styleUrl: './travels-card.component.scss'
})
export class TravelsCardComponent {
	#travelsService = inject(TravelsService);
	#destroyRef = inject(DestroyRef);
	travel = input.required<Travel>();
	deleted = output<number>();

	async deleteEvent(id: Travel['id']): Promise<void> {
		// const confirmed = await this.openModal();
		// if (confirmed) {
		// 	this.#eventsService.deleteEvent(this.event().id!).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => this.deleted.emit(id!));
		// }
	}
}
