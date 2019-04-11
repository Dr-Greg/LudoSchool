import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const signInUrl: string = 'https://solidaire.berwick.fr/api/auth/login';
const signUpUrl: string = 'https://solidaire.berwick.fr/api/auth/register';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	authenticationState = new BehaviorSubject(false);

	constructor(private storage: Storage, private platform: Platform, private http: HttpClient) {
		this.platform.ready().then(() => {
			this.checkToken();
		});
	}

	signIn(username: string, password: string) {
		return new Promise((resolve, reject) => {
			this.http.post(signInUrl, JSON.stringify({ username, password })).subscribe(
				(res) => {
					resolve(res);
				},
				(err) => {
					console.log(err);
					reject(err);
				}
			);
		});
	}

	signUp(email: string, first_name: string, last_name: string, password: string, username: string) {
		return new Promise((resolve, reject) => {
			this.http.post(signUpUrl, JSON.stringify({ email, first_name, last_name, password, username })).subscribe(
				(res) => {
					resolve(res);
				},
				(err) => {
					console.log(err);
					reject(err);
				}
			);
		});
	}

	async logout() {
		return this.storage.remove('a').then(() => {
			this.authenticationState.next(false);
		});
	}

	isAuthenticated(): boolean {
		return this.authenticationState.value;
	}

	async checkToken() {
		return this.storage.get('token').then((res) => {
			if (res) {
				this.authenticationState.next(true);
			}
		});
	}
}
