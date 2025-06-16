import { Component, DestroyRef, inject } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64.directive';
import { Router } from '@angular/router';
import { TravelsService } from '../../shared/services/travels.service';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
declare var bootstrap: any;

@Component({
	selector: 'new-travel',
	imports: [MenuComponent, ReactiveFormsModule, EncodeBase64Directive, ValidationClassesDirective],
	templateUrl: './new-travel.component.html',
	styleUrl: './new-travel.component.scss'
})
export class NewTravelComponent {
	newTravelForm: FormGroup;
	#router = inject(Router);
	#travelsService = inject(TravelsService);
	#destroyRef = inject(DestroyRef);
	image = '';

	constructor(private fb: FormBuilder) {
		this.newTravelForm = this.fb.group({
			title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
			description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(400)]],
			maxPeople: [0, [Validators.required, Validators.min(0)]],
			minAge: [0, [Validators.required, Validators.min(0)]],
			temperature: ['', Validators.required],
			images: this.fb.array([], Validators.required),
			likes: [0],
			rate: [0],
			difficulty: [''],
			category: ['', Validators.required],
			keywords: this.fb.array([]),
			activities: this.fb.array([]),
			location: this.fb.group({
				country: ['', Validators.required],
				city: ['', Validators.required],
				coordinates: this.fb.group({
					lat: [0, Validators.required],
					lng: [0, Validators.required]
				})
			}),
			price: this.fb.group({
				adultPrice: [0, [Validators.required, Validators.min(0)]],
				childPrice: [0, Validators.min(0)],
			}),
			date: this.fb.group({
				startDate: ['', Validators.required],
				endDate: ['', Validators.required]
			}),
			logistics: this.fb.group({
				transport: ['', Validators.required],
				hotel: ['', Validators.required]
			}),
			include: this.fb.group({
				includes: this.fb.array([]),
				notIncludes: this.fb.array([])
			})
		});
	}

	get images(): FormArray {
		return this.newTravelForm.get('images') as FormArray;
	}

	get keywords(): FormArray {
		return this.newTravelForm.get('keywords') as FormArray;
	}

	get activities(): FormArray {
		return this.newTravelForm.get('activities') as FormArray;
	}

	get includes(): FormArray {
		return this.newTravelForm.get(['include', 'includes']) as FormArray;
	}

	get notIncludes(): FormArray {
		return this.newTravelForm.get(['include', 'notIncludes']) as FormArray;
	}

	addImage(image: string) {
		this.images.push(this.fb.control(image));
	}

	addKeyword(keyword: string) {
		this.keywords.push(this.fb.control(keyword));
	}

	addActivity(activity: string) {
		this.activities.push(this.fb.control(activity, Validators.required));
	}

	addInclude(item: string) {
		this.includes.push(this.fb.control(item));
	}

	addNotInclude(item: string) {
		this.notIncludes.push(this.fb.control(item));
	}

	addNewTravel() {
		console.log(this.newTravelForm.value);
		this.#travelsService.addTravel(this.newTravelForm.value).pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe({
				next: () => {
					this.showModalSuccess();
				},
				error: () => {
					this.showModalError();
				}
			});
	}

	redirectTravels() {
		this.#router.navigate(['/travels']);
	}

	showModalSuccess() {
		const modalChangeData = document.getElementById('modalCorrect');
		const modal = new bootstrap.Modal(modalChangeData);
		modal.show();
	}

	showModalError() {
		const modalChangeDataError = document.getElementById('modalIncorrect');
		const modal = new bootstrap.Modal(modalChangeDataError);
		modal.show();
	}
}
