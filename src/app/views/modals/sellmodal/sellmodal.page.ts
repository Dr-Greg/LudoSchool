import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
	selector: 'app-sellmodal',
	templateUrl: './sellmodal.page.html',
	styleUrls: ['./sellmodal.page.scss']
})
export class SellmodalPage implements OnInit {
	constructor(private modalCtrl: ModalController) {}

	ngOnInit() {}

	closeModal() {
		this.modalCtrl.dismiss();
	}
}
