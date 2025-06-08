import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY, map } from 'rxjs';
import { TravelsService } from '../services/travels.service';
import { Travel } from '../interfaces/travel';

export const travelResolver: ResolveFn<Travel> = (route) => {
	const travelsService = inject(TravelsService);
	const router = inject(Router);
	
	return travelsService.getTravel(route.paramMap.get('id')!).pipe(
    map(response => response.travel),
		catchError(() => {
			router.navigate(['/travels']);
			return EMPTY;
		})
	);
};
