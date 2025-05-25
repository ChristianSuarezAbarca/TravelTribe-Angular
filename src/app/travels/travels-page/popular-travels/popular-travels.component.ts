import { Component, inject, signal } from '@angular/core';
import { MenuComponent } from '../../../menu/menu.component';
import { TravelsCardComponent } from "../../travels-card/travels-card.component";
import { TravelsService } from '../../../shared/services/travels.service';
import { Travel } from '../../../shared/interfaces/travel';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'popular-travels',
	imports: [MenuComponent, TravelsCardComponent],
	templateUrl: '../travels-page.component.html',
	styleUrl: '../travels-page.component.scss'
})
export class PopularTravelsComponent {
	#travelsService = inject(TravelsService)
	travels = signal<Travel[]>([]);

	constructor() {
		const params = new URLSearchParams({});
		this.#travelsService.getTravels(params)
			.pipe(takeUntilDestroyed())
			.subscribe((travels) => {
				const filteredTravels = travels.travels.filter((travel) => travel.likes > 400 && travel.rate > 4);
				this.travels.set(filteredTravels);
				console.log(filteredTravels);
			});
	}


	deleteEvent(id: Travel['id']): void {
		this.travels.set(this.travels().filter(travel => travel.id !== id));
	}
}
