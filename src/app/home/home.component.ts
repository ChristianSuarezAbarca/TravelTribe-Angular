import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { TravelsService } from '../shared/services/travels.service';
import { Travel } from '../shared/interfaces/travel';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'home',
	imports: [RouterLink],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	#travelsService = inject(TravelsService)
	#authService = inject(AuthService);
	travels = signal<Travel[]>([]);
	isLogged = computed<boolean>(() => this.#authService.getLogged());

	constructor(){
		const params = new URLSearchParams({ });
		this.#travelsService.getTravels(params).pipe(takeUntilDestroyed()).subscribe((travels) => {
			this.travels.set(travels.travels);
		});
	}
}
