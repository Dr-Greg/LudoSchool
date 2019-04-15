import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
	selector: 'app-formationmodal',
	templateUrl: './formationmodal.page.html',
	styleUrls: ['./formationmodal.page.scss']
})
export class FormationmodalPage implements OnInit {
	constructor(private modalCtrl: ModalController) {}

	ngOnInit() {}

	closeModal() {
		this.modalCtrl.dismiss();
	}
}
