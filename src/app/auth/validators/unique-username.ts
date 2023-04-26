import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl } from "@angular/forms";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({
	providedIn: "root",
})
export class UniqueUsername implements AsyncValidator {
	constructor(private authService: AuthService) {}

	validate = (control: AbstractControl): any => {
		const { value } = control;

		return this.authService.usernameAvailable(value).pipe(
			map(value => {
				if (value.available) {
					return null;
				} else {
					return value;
				}
			}),
			catchError(err => {
				if (err.error.username) {
					return of({ nonUniqueUsername: true });
				} else {
					return of({ noConnection: true });
				}
			})
		);
	};
}
