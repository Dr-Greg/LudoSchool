import { FormationmodalPage } from './../modals/formationdetail/formationmodal.page';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
	synchronized = false;
	courses = [];

	constructor(
		private navCtrl: NavController,
		private storage: Storage,
		private platform: Platform,
		private alertCtrl: AlertController,
		private coursesService: CoursesService,
		private modalCtrl: ModalController
	) {}

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
						this.coursesService
							.loadFollowFormations()
							.then((res) => {
								if (res) {
									this.courses = res['data'];
								}
							})
							.catch(async (err) => {});
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
		this.storage.get('wifi_on_off').then((wifiOn) => {
			if (wifiOn === 'on') {
				this.coursesService
					.loadFollowFormations()
					.then((res) => {
						if (res) {
							this.courses = res['data'];
							event.target.complete();
						}
					})
					.catch(async (err) => {
						event.target.complete();
					});
			} else {
				this.storage.get('follow_formations').then((followFormations) => {
					if (followFormations) {
						followFormations = JSON.parse(followFormations);
					} else {
						followFormations = [];
					}
					if (followFormations) {
						this.courses = followFormations;
					}
					event.target.complete();
				});
			}
		});
	}

	async showFormationDetail(index: number) {
		const modal = await this.modalCtrl.create({
			component: FormationmodalPage,
			componentProps: { courseShort: this.courses[index] }
		});
		return await modal.present();
	}

	coursesNotNull(): boolean {
		return this.courses !== null && this.courses.length > 0;
	}
}
