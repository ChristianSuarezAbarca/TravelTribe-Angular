import { inject, Injectable, signal } from '@angular/core';
import { User, UserLogin } from '../interfaces/user';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SingleUserResponse, TokenResponse } from '../interfaces/responses';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	#url = 'auth';
	#http = inject(HttpClient);
	#logged = signal(false);

	login(user: UserLogin): Observable<TokenResponse> {
		return this.#http.post<TokenResponse>(this.#url + '/login', user).pipe(
			tap({
				next: (resp) => {
					localStorage.setItem("token", resp.accessToken);
					this.#logged.set(true);
				}
			})
		);
	}

	register(user: User): Observable<User> {
		return this.#http.post<SingleUserResponse>(this.#url + '/register', user).pipe(map((resp) => resp.user));
	}

	getLogged(): boolean {
		return this.#logged();
	}

	logout(): void {
		localStorage.removeItem("token");
		this.#logged.set(false);
	}

	isLogged(): Observable<boolean> {
		const token = localStorage.getItem('token');

		if (!this.#logged() && !token) {
			return of(false);
		}

		if (this.#logged()) {
			return of(true);
		}
		
		if (token) {
			return this.#http.post<boolean>(this.#url + '/validate', { token }).pipe(map(() => {
				this.#logged.set(true);
				return true;
			}),
				catchError(() => {
					localStorage.removeItem('token');
					this.#logged.set(false);
					return of(false);
				})
			);
		}

		return of(false);
	}

	checkFieldUnique(value: string, field: string): Observable<boolean> {
		return this.#http.get<boolean>(`${this.#url}/fieldUnique`, {
			params: { value, field }
		});
	}
}
