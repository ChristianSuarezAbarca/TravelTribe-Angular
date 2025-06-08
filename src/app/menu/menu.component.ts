import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../shared/interfaces/user';

@Component({
  selector: 'top-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
	#authService = inject(AuthService);
	#router = inject(Router);
	user = computed<User | null>(() => this.#authService.getUser());
	isLogged = computed<boolean>(() => this.#authService.getLogged());

	logout(){
		this.#authService.logout();
		this.#router.navigate(['/auth/login']);
	}
}
