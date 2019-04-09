import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

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
	accept: boolean;

	constructor(private loadingController: LoadingController, private toastController: ToastController) {}

	ngOnInit() {}

	async signUp() {
		if (this.formValid()) {
			const loading = await this.loadingController.create({
				message: 'Chargement...'
			});
			await loading.present();

			// CALL API FOR REGISTER

			setTimeout(() => {
				loading.dismiss();
			}, 5000);
		} else {
			const toast = await this.toastController.create({
				message: 'Formulaire invalide.',
				showCloseButton: true,
				closeButtonText: 'OK'
			});
			await toast.present();
		}
	}

	private formValid(): boolean {
		return this.firstName !== '' || this.lastName !== '' || this.email !== '' || this.password !== '' || this.accept;
	}
}
