import { Component } from '@angular/core';
import { MenuComponent } from '../../../menu/menu.component';
import { TravelsCardComponent } from "../../travels-card/travels-card.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TravelsPageComponent } from '../travels-page.component';

@Component({
	selector: 'adventure-travels',
	imports: [MenuComponent, TravelsCardComponent],
	templateUrl: '../travels-page.component.html',
	styleUrl: '../travels-page.component.scss'
})
export class AdventureTravelsComponent extends TravelsPageComponent {
	constructor() {
		super();
		const params = new URLSearchParams({});
		this.travelsService.getTravels(params)
			.pipe(takeUntilDestroyed())
			.subscribe((travels) => {
				this.travels.set(travels.travels.filter(travels => travels.difficulty !== ''));
			});
	}
}
