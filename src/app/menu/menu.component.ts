import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'top-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
	#authService = inject(AuthService);
	#router = inject(Router);

	isLogged = computed<boolean>(() => this.#authService.getLogged());

	logout(){
		this.#authService.logout();
		this.#router.navigate(['/auth/login']);
	}
}
