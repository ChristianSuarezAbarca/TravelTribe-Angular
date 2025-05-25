import { Component, inject, signal } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { TravelsCardComponent } from "../travels-card/travels-card.component";
import { TravelsService } from '../../shared/services/travels.service';
import { Travel } from '../../shared/interfaces/travel';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'travels-page',
	imports: [MenuComponent, TravelsCardComponent],
	templateUrl: './travels-page.component.html',
	styleUrl: './travels-page.component.scss'
})
export class TravelsPageComponent {
	#travelsService = inject(TravelsService)
	travels = signal<Travel[]>([]);

	constructor(){
		const params = new URLSearchParams({ });
		this.#travelsService.getTravels(params).pipe(takeUntilDestroyed()).subscribe((travels) => {
			this.travels.set(travels.travels);
			console.log(travels.travels);
		});
	}

	deleteEvent(id: Travel['id']): void {
		this.travels.set(this.travels().filter(travel => travel.id !== id));
	}
}
