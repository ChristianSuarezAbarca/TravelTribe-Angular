import { Component, computed, DestroyRef, inject, input, output } from '@angular/core';
import { Travel } from '../../shared/interfaces/travel';
import { TravelsService } from '../../shared/services/travels.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces/user';
import { UserService } from '../../shared/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';

@Component({
	selector: 'travels-card',
	imports: [RouterLink, NgClass],
	templateUrl: './travels-card.component.html',
	styleUrl: './travels-card.component.scss'
})
export class TravelsCardComponent {
	#travelsService = inject(TravelsService);
	#authService = inject(AuthService);
	#userService = inject(UserService);
	#destroyRef = inject(DestroyRef);
	travel = input.required<Travel>();
	travelLiked = output<Travel>();
	deleted = output<string>();
	user = computed<User | null>(() => this.#authService.getUser());
	isLogged = computed<boolean>(() => this.#authService.getLogged());
	isSaved = computed<boolean>(() => {
		return this.user()!.travelInteractions!.some(
			interaction => interaction.type === 'saved' && interaction.travel === this.travel()._id
		)
	});
	isLiked = computed<boolean>(() => {
		return this.user()!.travelInteractions!.some(
			interaction => interaction.type === 'liked' && interaction.travel === this.travel()._id
		)
	});
	isBought = computed<boolean>(() => {
		return this.user()!.travelInteractions!.some(
			interaction => interaction.type === 'bought' && interaction.travel === this.travel()._id
		)
	});

	deleteTravel(id: string): void {
		this.#travelsService.deleteTravel(id).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(id => this.deleted.emit(id));
	}

	saveTravel(saveOrUnsave: string): void {
		this.#userService.addSavedTravel({ travelId: this.travel()!._id, userId: this.user()!._id, saveOrUnsave: saveOrUnsave }).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
	}

	likeTravel(likeOrUnlike: string): void {
		this.#userService.addLikedTravel({ travelId: this.travel()!._id, userId: this.user()!._id, likeOrUnlike: likeOrUnlike }).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
		this.#travelsService.addLike({ travel: this.travel(), likeOrUnlike: likeOrUnlike }).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(response => {
			const updated = { ...this.travel(), likes: response.likes };
			this.travelLiked.emit(updated);
		});
	}

	buyTravel(saveOrUnsave: string): void {
		this.#userService.addBoughtTravel({ travelId: this.travel()!._id, userId: this.user()!._id, saveOrUnsave: saveOrUnsave }).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
	}
}
