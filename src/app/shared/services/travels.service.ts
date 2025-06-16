import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleTravelResponse, TravelsResponse } from '../interfaces/responses';
import { Travel } from '../interfaces/travel';

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

	addLike(data: { travel: Travel, likeOrUnlike: string}): Observable<{ likes: number}> {
		return this.#http.put<{ likes: number}>(this.#url + '/addOrRemoveLike', data);
	}

	deleteTravel(id: string): Observable<string> {
		return this.#http.delete<string>(this.#url + '/' + id);
	}

	addTravel(travel: Travel): Observable<Travel> {
		console.log(travel)
		return this.#http.post<Travel>(this.#url, travel);
	}
}
