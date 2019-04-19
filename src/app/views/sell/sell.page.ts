import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SellmodalPage } from 'src/app/views/modals/sellmodal/sellmodal.page';
import { BuymodalPage } from '../modals/buymodal/buymodal.page';
import { ToursService } from './../../services/tours.service';

@Component({
	selector: 'app-sell',
	templateUrl: './sell.page.html',
	styleUrls: ['./sell.page.scss']
})
export class SellPage implements OnInit {
	actions = [
		{ type: 'meet', name: 'Collecte du 12/03/19' },
		{ type: 'buy', name: 'Achat du 12/03/19' },
		{ type: 'sell', name: 'Vente du 12/03/19' }
	];

	tours = [];

	constructor(private modalCtrl: ModalController, private toursService: ToursService) {}

	ngOnInit() {
		this.toursService.getToursList().then((res) => {
			this.tours = res['data'];
			console.log(this.tours);
		});
	}

	async openSellModal() {
		const modal = await this.modalCtrl.create({
			component: SellmodalPage,
			componentProps: { value: 123 }
		});
		return await modal.present();
	}

	async openBuyModal() {
		const modal = await this.modalCtrl.create({
			component: BuymodalPage,
			componentProps: { value: 123 }
		});
		return await modal.present();
	}

	onCancel(index) {
		this.actions.splice(index, 1);
	}
}
