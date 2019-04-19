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
	coopList = [];

	constructor(
		private authService: AuthenticationService,
		private storage: Storage,
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

					this.storage.set('coop_list', res['data']).then(() => {
						localStorage.setItem('coop_list', res['data']);
						this.storage.set('coop_list', JSON.stringify(res['data'])).then(() => {
							console.log(this.storage.get('coop_list'));
						});
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

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
						res['data']['coop_id'] = 27;
						this.storage.set('token', res['data']['token']).then(() => {
							localStorage.setItem('token', res['data']['token']);
							localStorage.setItem('coopId', (27).toString());
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
		return this.email !== '' || this.password !== '';
	}
}
