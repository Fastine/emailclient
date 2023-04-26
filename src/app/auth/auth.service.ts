import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, tap } from "rxjs";

interface UsernameAvailableResponse {
	available: boolean;
}

export interface SignUpCredentials {
	username: string;
	password: string;
	passwordConfirmation: string;
}

export interface SignUpResponse {
	username: string;
}

interface SignedInResponse {
	authenticated: boolean;
	username: string;
}

export interface SignInCredentials {
	username: string;
	password: string;
}

export interface SignInResponse {
	username: string;
}

@Injectable({
	providedIn: "root",
})
export class AuthService {
	baseUrl = "https://api.angular-email.com/";
	signedIn$ = new BehaviorSubject<boolean | null>(null);
	username = "";

	constructor(private http: HttpClient) {}

	usernameAvailable(username: string) {
		return this.http.post<UsernameAvailableResponse>(this.baseUrl + "auth/username", {
			username,
		});
	}

	signUp(credentials: SignUpCredentials) {
		return this.http.post<SignUpResponse>(this.baseUrl + "auth/signup", credentials).pipe(
			tap(({ username }) => {
				this.signedIn$.next(true);
				this.username = username;
			})
		);
	}

	checkAuth() {
		return this.http.get<SignedInResponse>(this.baseUrl + "auth/signedIn").pipe(
			tap(({ authenticated, username }) => {
				this.signedIn$.next(authenticated);
				this.username = username;
			})
		);
	}

	signOut() {
		return this.http.post(this.baseUrl + "auth/signout", {}).pipe(
			tap(() => {
				this.signedIn$.next(null);
				this.username = "";
			})
		);
	}

	signIn(credentials: SignInCredentials) {
		return this.http.post<SignInResponse>(this.baseUrl + "auth/signin", credentials).pipe(
			tap(({ username }) => {
				this.signedIn$.next(true);
				this.username = username;
			})
		);
	}
}
