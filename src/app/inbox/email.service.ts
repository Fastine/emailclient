import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Email } from "./_models/email";
import { EmailSummary } from "./_models/emailSummary";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class EmailService {
	baseUrl = "https://api.angular-email.com/";

	constructor(private http: HttpClient) {}

	getEmails() {
		return this.http.get<EmailSummary[]>(this.baseUrl + "emails");
	}

	getEmail(id: string) {
		return this.http.get<Email>(this.baseUrl + "emails/" + id);
	}

	sendEmail(email: Email) {
		return this.http.post<Email>(this.baseUrl + "emails", email);
	}
}
