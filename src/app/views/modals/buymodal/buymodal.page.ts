import { Storage } from '@ionic/storage';
import { ToursService } from './../../../services/tours.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-buymodal',
	templateUrl: './buymodal.page.html',
	styleUrls: ['./buymodal.page.scss']
})
export class BuymodalPage implements OnInit {
	coopId: number;
	wifiOn: boolean = false;
	toursList = [];
	items = [];
	from = 1;
	to = 20;
	cart = [];

	constructor(private modalCtrl: ModalController, private toursService: ToursService, private storage: Storage) {}

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

								this.toursService
									.itemList(this.coopId, this.from, this.to)
									.then((res) => {
										if (res) {
											this.items = res['data'];
										}
									})
									.catch(async (err) => {
										this.toursList = [];
									});
							}
						})
						.catch(async (err) => {
							this.toursList = [];
						});
				} else {
					this.storage.get('items').then((items) => {
						if (items) {
							this.items = JSON.parse(items);
						}
					});
				}
			});
		});
	}

	decrement(index: number) {
		const itemToAdd = this.items[index];

		this.cart.forEach((item) => {
			if (item.id === itemToAdd.id) {
				const focusItem = this.cart[this.cart.indexOf(item)];
				focusItem.quantity -= 1;
				if (focusItem.quantity <= 0) {
					this.cart.splice(this.cart.indexOf(focusItem), 1);
				}
			}
		});
	}

	increment(index: number) {
		const itemToAdd = this.items[index];
		let added = false;

		this.cart.forEach((item) => {
			if (item.id === itemToAdd.id) {
				this.cart[this.cart.indexOf(item)].quantity += 1;
				added = true;
			}
		});

		if (!added) {
			this.cart.push({ id: this.items[index].id, quantity: 1 });
		}
	}

	closeModal() {
		this.modalCtrl.dismiss();
	}

	quantityOf(index: number) {
		const item = this.items[index];
		let quantity = 0;
		this.cart.forEach((itemCart) => {
			if (item.id === itemCart.id) {
				quantity = itemCart.quantity;
			}
		});
		return quantity.toString();
	}

	checkout() {
		this.closeModal();
	}
}
