import { ToursService } from './../../../services/tours.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-sellmodal',
	templateUrl: './sellmodal.page.html',
	styleUrls: ['./sellmodal.page.scss']
})
export class SellmodalPage implements OnInit {
	toursList = [];
	wifiOn: boolean = false;
	coopId: number;

	constructor(private storage: Storage, private modalCtrl: ModalController, private toursService: ToursService) {}

	ngOnInit() {
		this.storage.get('user_data').then((userData) => {
			userData = JSON.parse(userData);
			this.coopId = userData['coop_id'];
			this.storage.get('wifi_on_off').then((wifiOn) => {
				this.wifiOn = wifiOn === 'on' ? true : false;
				if (wifiOn === 'on') {
					this.toursService
						.getToursList()
						.then((res) => {
							if (res) {
								console.log(res['data']);
								this.toursList = res['data'];
							}
						})
						.catch(async (err) => {
							this.toursList = [];
						});
				}
			});
		});
	}

	closeModal() {
		this.modalCtrl.dismiss();
	}

	toursNotEmpty() {
		return this.toursList != null && this.toursList.length > 0;
	}
}
