import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleTravelResponse, TravelsResponse } from '../interfaces/responses';

@Injectable({
	providedIn: 'root'
})
export class TravelsService {
	#url = 'travels';
	#http = inject(HttpClient);

	getTravels(params: URLSearchParams): Observable<TravelsResponse> {
		return this.#http.get<TravelsResponse>(this.#url);
	}

	getTravel(id: string): Observable<SingleTravelResponse> {
		return this.#http.get<SingleTravelResponse>(this.#url + '/' + id);
	}
}
