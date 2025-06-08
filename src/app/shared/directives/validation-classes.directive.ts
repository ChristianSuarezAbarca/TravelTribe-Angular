import { computed, Directive, inject, Injector, input, OnInit, signal, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NgControl } from "@angular/forms";
import { EMPTY } from "rxjs";

@Directive({
	selector: '[validationClasses][formControlName]',
	standalone: true,
	host: {
		'[class]': 'inputClass()',
		'(blur)': 'touched.set(true)',
	},
})
export class ValidationClassesDirective implements OnInit {
	#ngControl = inject(NgControl, { optional: true });
	#injector = inject(Injector);
	validationClasses = input<{ valid: string; invalid: string }>();
	valueChanges!: Signal<unknown>;
	statusChanges!: Signal<string>;
	touched = signal(false);

	ngOnInit(): void {
		this.valueChanges = toSignal(
			this.#ngControl?.valueChanges ?? EMPTY,
			{ injector: this.#injector }
		);

		this.statusChanges = toSignal(
			this.#ngControl?.statusChanges ?? EMPTY,
			{ injector: this.#injector }
		);
	}

	inputClass = computed(() => {
		this.valueChanges();
		this.statusChanges();

		const isTouched = this.touched();
		const validationClasses = this.validationClasses();
		const status = this.#ngControl?.status;

		if (!isTouched || status === 'PENDING') {
			return '';
		}

		return status === 'INVALID'
			? validationClasses?.invalid
			: validationClasses?.valid;
	});
}