import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TravelsResponse } from '../interfaces/responses';

@Injectable({
	providedIn: 'root'
})
export class TravelsService {
	#url = 'travels';
	#http = inject(HttpClient);

	getTravels(params: URLSearchParams): Observable<TravelsResponse> {
		return this.#http.get<TravelsResponse>(this.#url).pipe(map((resp) => {
			console.log(resp)
			return resp
		}));
	}
}
