import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
	selector: 'app-buymodal',
	templateUrl: './buymodal.page.html',
	styleUrls: ['./buymodal.page.scss']
})
export class BuymodalPage implements OnInit {
	constructor(private modalCtrl: ModalController) {}

	ngOnInit() {}

	closeModal() {
		this.modalCtrl.dismiss();
	}
}
