import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.page.html',
	styleUrls: ['./signin.page.scss']
})
export class SigninPage implements OnInit {
	email = '';
	password = '';

	constructor(
		private authService: AuthenticationService,
		private storage: Storage,
		private loadingController: LoadingController,
		private toastController: ToastController
	) {}

	ngOnInit() {}

	async signIn() {
		if (this.formValid()) {
			const loading = await this.loadingController.create({
				message: 'Chargement...'
			});
			await loading.present();
			this.authService
				.signIn(this.email, this.password)
				.then((res) => {
					if (res) {
						loading.dismiss();
						this.storage.set('token', res['data']['token']).then(() => {
							this.storage.set('user_data', JSON.stringify(res['data'])).then(() => {
								this.authService.checkToken();
							});
						});
					}
				})
				.catch(async (err) => {
					loading.dismiss();
					const toast = await this.toastController.create({
						message: 'Vérifiez les champs de connexion',
						showCloseButton: true,
						closeButtonText: 'OK'
					});
					await toast.present();
				});
		} else {
			const toast = await this.toastController.create({
				message: 'Vérifiez les champs de connexion',
				showCloseButton: true,
				closeButtonText: 'OK'
			});
			await toast.present();
		}
	}

	private formValid(): boolean {
		return this.email !== '' || this.password !== '';
	}
}
