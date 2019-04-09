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

	constructor(private storage: Storage, private loadingController: LoadingController, private toasController: ToastController) {}

	ngOnInit() {}

	async signIn() {
		if (this.formValid()) {
			const loading = await this.loadingController.create({
				message: 'Chargement...'
			});

			await loading.present();
			// API CALL

			setTimeout(() => {
				loading.dismiss();
			}, 5000);
		} else {
			const toast = await this.toasController.create({
				message: 'Formulaire invalide.',
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
