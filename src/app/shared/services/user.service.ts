import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	#url = 'users';
	#http = inject(HttpClient);
	#auth = inject(AuthService);

	changeData(user: User, type: string): Observable<User> {
		const params = new HttpParams().set('type', type);
		return this.#http.put<User>(this.#url + '/' + user._id, user, { params }).pipe(tap(user => this.#auth.updateUser(user)));
	}

	addSavedTravel(data: { travelId: string | undefined, userId: string | undefined, saveOrUnsave: string }): Observable<User> {
		return this.#http.put<User>(this.#url + '/addOrRemoveSaved', data).pipe(tap(user => this.#auth.updateUser(user)));
	}

	addLikedTravel(data: { travelId: string | undefined, userId: string | undefined, likeOrUnlike: string }): Observable<User> {
		return this.#http.put<User>(this.#url + '/addOrRemoveLiked', data).pipe(tap(user => this.#auth.updateUser(user)));
	}

	getUsers(): Observable<User[]> {
		return this.#http.get<User[]>(this.#url);
	}

	banUser(id: string | undefined): Observable<User> {
		return this.#http.put<User>(this.#url + '/ban', { id: id });
	}

	addBoughtTravel(data: { travelId: string | undefined, userId: string | undefined, saveOrUnsave: string }): Observable<User> {
		return this.#http.put<User>(this.#url + '/addOrRemoveBought', data).pipe(tap(user => this.#auth.updateUser(user)));
	}
}
