import { Component } from '@angular/core';
import { MenuComponent } from '../../../menu/menu.component';
import { TravelsCardComponent } from "../../travels-card/travels-card.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TravelsPageComponent } from '../travels-page.component';

@Component({
	selector: 'popular-travels',
	imports: [MenuComponent, TravelsCardComponent],
	templateUrl: '../travels-page.component.html',
	styleUrl: '../travels-page.component.scss'
})
export class PopularTravelsComponent extends TravelsPageComponent {
	constructor() {
		super();
		const params = new URLSearchParams({});
		this.travelsService.getTravels(params)
			.pipe(takeUntilDestroyed())
			.subscribe((travels) => {
				this.travels.set(travels.travels.sort((a, b) => b.likes - a.likes).slice(0, 5));
			});
	}
}
