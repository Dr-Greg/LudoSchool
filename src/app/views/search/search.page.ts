import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CoursesService } from 'src/app/services/courses.service';
import { FormationmodalPage } from '../modals/formationdetail/formationmodal.page';

@Component({
	selector: 'app-search',
	templateUrl: './search.page.html',
	styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
	coopId: number;
	wifiOn: boolean = false;
	from = 0;
	to = 20;
	formations = [];
	searchInput: string;

	constructor(private storage: Storage, private coursesService: CoursesService, private modalCtrl: ModalController) {}

	ngOnInit() {
		this.storage.get('user_data').then((userData) => {
			this.coopId = userData['coop_id'];
			this.storage.get('wifi_on_off').then((wifiOn) => {
				this.wifiOn = wifiOn === 'on' ? true : false;

				if (wifiOn === 'on') {
					this.coursesService
						.loadFormations(this.from, this.to, this.coopId)
						.then((res) => {
							if (res) {
								console.log(res['data']);
								this.formations = res['data'];
							}
						})
						.catch(async (err) => {
							this.formations = [];
						});
				} else {
					this.storage.get('formations').then((formations) => {
						if (formations) {
							this.formations = JSON.parse(formations);
						}
					});
				}
			});
		});
	}

	doRefresh(event) {
		if (this.wifiOn) {
			this.coursesService
				.loadFormations(this.from, this.to, this.coopId)
				.then((res) => {
					if (res) {
						this.formations = res['data'];
					}
					event.target.complete();
				})
				.catch(async (err) => {
					this.formations = [];
					event.target.complete();
				});
		} else {
			event.target.complete();
		}
	}

	onSearchInputEnter(event) {
		if (this.wifiOn) {
			if (this.searchInput == '') {
				this.coursesService
					.loadFormations(this.from, this.to, this.coopId)
					.then((res) => {
						if (res) {
							this.formations = res['data'];
						}
					})
					.catch(async (err) => {
						this.formations = [];
					});
			} else {
				this.coursesService
					.loadFormationsWith(this.searchInput, this.from, this.to, this.coopId)
					.then((res) => {
						if (res) {
							this.formations = res['data'];
						}
					})
					.catch(async (err) => {
						this.formations = [];
					});
			}
		}
	}

	onSearchInputClear(event) {
		this.searchInput = '';
		if (this.wifiOn) {
			this.coursesService
				.loadFormations(this.from, this.to, this.coopId)
				.then((res) => {
					if (res) {
						this.formations = res['data'];
					}
				})
				.catch(async (err) => {
					this.formations = [];
				});
		}
	}

	/*followFormation(index: number) {
		this.storage.get('follow_formations').then((follow_formations) => {
			follow_formations.push(this.formations[index]);
			this.storage.set('follow_formations', JSON.stringify(follow_formations));
			this.formations.slice(index, 1);
		});
	}*/

	async showFormationDetail(index: number) {
		const modal = await this.modalCtrl.create({
			component: FormationmodalPage,
			componentProps: this.formations[index]
		});
		return await modal.present();
	}

	formationsNotNull(): boolean {
		return this.formations !== null && this.formations.length > 0;
	}
}
