import { computed, Directive, inject, Injector, input, OnInit, signal, Signal, untracked } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NgControl } from "@angular/forms";
import { EMPTY } from "rxjs";

@Directive({
	selector: '[validationClasses][formControlName])',
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
	valueChanges!: Signal<string>;
	touched = signal(false);

	ngOnInit(): void {
		this.valueChanges = toSignal(
			this.#ngControl?.valueChanges ?? EMPTY,
			{ injector: this.#injector }
		);
	}

	inputClass = computed(() => {
		const touched = this.touched();
		const validationClasses = this.validationClasses();
		this.valueChanges();

		return untracked(() => {
			if (touched) {
				return this.#ngControl?.invalid
					? validationClasses?.invalid
					: validationClasses?.valid;
			}
			return '';
		});
	});
}