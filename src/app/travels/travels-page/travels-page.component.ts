import { AfterViewInit, Component, computed, inject, signal } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { TravelsCardComponent } from "../travels-card/travels-card.component";
import { TravelsService } from '../../shared/services/travels.service';
import { Travel } from '../../shared/interfaces/travel';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
	selector: 'travels-page',
	imports: [MenuComponent, TravelsCardComponent],
	templateUrl: './travels-page.component.html',
	styleUrl: './travels-page.component.scss'
})
export class TravelsPageComponent implements AfterViewInit {
	protected travelsService = inject(TravelsService);
	protected authServices = inject(AuthService);
	travels = signal<Travel[]>([]);
	allTravels = signal<Travel[]>([]);
	actualUser = computed<User | null>(() => this.authServices.getUser());
	#router = inject(Router);

	constructor() {
		const params = new URLSearchParams({});
		this.travelsService.getTravels(params).pipe(takeUntilDestroyed()).subscribe((travels) => {
			this.allTravels.set(travels.travels);
			this.travels.set(travels.travels.filter(travels => travels.difficulty === ''));
		});
	}

	ngAfterViewInit(): void {
		if (this.actualUser() && this.actualUser()!.banned) {
			const modalBanned = document.getElementById('modalBanned');
			if (modalBanned) {
				const modal = new bootstrap.Modal(modalBanned);
				modal.show();
			}
		}
	}

	deleteEvent(id: string): void {
		this.travels.set(this.travels().filter(travel => travel._id !== id));
	}

	updateLikedTravel(updated: Travel) {
		this.travels.update(list =>
			list.map(t => t._id === updated._id ? updated : t)
		);
	}

	deleteToken() {
		localStorage.removeItem("token");
		this.#router.navigate(['/home']);
	}
}
