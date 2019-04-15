import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.page.html',
	styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
	check = false;
	formations = [];

	constructor(private storage: Storage, private coursesService: CoursesService) {}

	ngOnInit() {}

	doRefresh(event) {
		this.formations = null;
		this.storage.get('wifi_on_off').then((wifiOn) => {
			if (wifiOn === 'on') {
				this.coursesService
					.loadFormations()
					.then((res) => {
						if (res) {
							console.log(res);
							event.target.complete();
						}
					})
					.catch(async (err) => {
						event.target.complete();
					});
			} else {
				this.storage.get('formations').then((formations) => {
					if (formations) {
						console.log(formations);
						this.formations = JSON.parse(formations);
					}
					event.target.complete();
				});
			}
		});
	}
}
