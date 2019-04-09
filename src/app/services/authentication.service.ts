import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	authenticationState = new BehaviorSubject(false);

	constructor(private storage: Storage, private platform: Platform) {
		this.platform.ready().then(() => {
			this.checkToken();
		});
	}

	async login() {
		return this.storage.set('token', 'Bearer 1234').then(() => {
			this.authenticationState.next(true);
		});
	}

	async logout() {
		return this.storage.remove('token').then(() => {
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
