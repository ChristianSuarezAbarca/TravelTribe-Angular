import { Component, input } from '@angular/core';
import { TravelsCardComponent } from "../travels-card/travels-card.component";
import { Travel } from '../../shared/interfaces/travel';

@Component({
	selector: 'travel-detail',
	imports: [TravelsCardComponent],
	templateUrl: './travel-detail.component.html',
	styleUrl: './travel-detail.component.scss'
})
export class TravelDetailComponent {
	travel = input.required<Travel>();
}
