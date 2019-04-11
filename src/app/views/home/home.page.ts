import { NavController } from '@ionic/angular';
import { TabsPage } from './../tabs/tabs.page';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
	synchronized = false;
	courses = [];

	constructor(private navCtrl: NavController, private storage: Storage, private platform: Platform, private alertCtrl: AlertController) {}

	ngOnInit() {
		this.platform.ready().then(() => {
			setTimeout(() => {
				this.storage.get('token').then((token) => {
					if (token) {
						this.askForWifi();
					}
				});
			}, 1000);
		});
	}

	async askForWifi() {
		const alert = await this.alertCtrl.create({
			header: 'WIFI',
			message: 'Avez-vous accès au wifi ?',
			buttons: [
				{
					text: 'Non',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						this.storage.set('wifi_on_off', 'off');
						this.storage.get('follow_formations').then((followFormations) => {
							if (followFormations) {
								console.log(followFormations);
								this.courses = JSON.parse(followFormations);
							}
							this.synchronized = true;
						});
					}
				},
				{
					text: 'Oui',
					handler: () => {
						this.storage.set('wifi_on_off', 'on');
						// CALL API FOR FORMATIONS SYNC
						this.synchronized = true;
					}
				}
			]
		});

		await alert.present();
	}

	browsCourses() {
		this.navCtrl.navigateForward(['tabs', 'search']);
	}

	doRefresh(event) {
		setTimeout(() => {
			event.target.complete();
		}, 2000);
	}
}
