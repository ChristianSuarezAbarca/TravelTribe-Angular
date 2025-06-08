import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { SingleUserResponse } from '../interfaces/responses';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	#url = 'users';
	#http = inject(HttpClient);

	changeData(user: User, type: string): Observable<SingleUserResponse> {
		const params = new HttpParams().set('type', type);
		console.log(user)
		return this.#http.put<SingleUserResponse>(this.#url + '/' + user._id, user, { params });
	}
}
