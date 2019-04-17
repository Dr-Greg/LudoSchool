import { CoursesService } from './../../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-formationmodal',
	templateUrl: './formationmodal.page.html',
	styleUrls: ['./formationmodal.page.scss']
})
export class FormationmodalPage implements OnInit {
	courseShort;
	courseLong;
	wifiOn: boolean = false;

	chapterContent = {};

	constructor(private storage: Storage, private modalCtrl: ModalController, private coursesService: CoursesService) {}

	ngOnInit() {
		this.storage.get('wifi_on_off').then((wifiOn) => {
			this.wifiOn = wifiOn === 'on' ? true : false;

			if (wifiOn === 'on') {
				this.coursesService
					.formationDetails(this.courseShort['id'])
					.then((res) => {
						if (res) {
							console.log(res['data']);
							this.courseLong = res['data'];
						}
					})
					.catch(async (err) => {});
			} else {
				this.storage.get('course_' + this.courseShort['id']).then((courseLong) => {
					if (courseLong) {
						this.courseLong = JSON.parse(courseLong);
						console.log(courseLong);
					}
				});
			}
		});
	}

	closeModal() {
		this.modalCtrl.dismiss();
	}
}
