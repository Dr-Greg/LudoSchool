import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
	firstName = '';
	lastName = '';
	email = '';
	password = '';
	coopId: number;
	accept: boolean;

	coopList = [];

	constructor(
		private storage: Storage,
		private authService: AuthenticationService,
		private loadingController: LoadingController,
		private toastController: ToastController
	) {}

	ngOnInit() {
		this.authService
			.coopList()
			.then((res) => {
				if (!res['error'] && res['data']) {
					this.coopList = res['data'];
					console.log(this.coopList);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async signUp() {
		if (this.formValid()) {
			const loading = await this.loadingController.create({
				message: 'Chargement...'
			});
			await loading.present();
			this.authService
				.signUp(this.email, this.firstName, this.lastName, this.password, this.email, this.coopId)
				.then((res) => {
					if (res) {
						this.storage.clear().then(() => {
							loading.dismiss();
							this.storage.set('token', res['data']['token']).then(() => {
								this.storage.set('user_data', JSON.stringify(res['data'])).then(() => {
									this.authService.checkToken();
								});
							});
						});
					}
				})
				.catch(async (err) => {
					loading.dismiss();
					const toast = await this.toastController.create({
						message: 'Vérifiez les champs de connexion',
						showCloseButton: true,
						closeButtonText: 'OK',
						duration: 3000
					});
					await toast.present();
				});
		} else {
			const toast = await this.toastController.create({
				message: 'Vérifiez les champs de connexion',
				showCloseButton: true,
				closeButtonText: 'OK',
				duration: 3000
			});
			await toast.present();
		}
	}

	private formValid(): boolean {
		return this.firstName !== '' || this.lastName !== '' || this.email !== '' || this.password !== '' || this.accept;
	}
}
