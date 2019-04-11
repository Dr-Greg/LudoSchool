import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-search',
	templateUrl: './search.page.html',
	styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
	check = false;
	courses = [];

	constructor() {}

	ngOnInit() {
		// CALL API
	}

	doRefresh(event) {
		setTimeout(() => {
			console.log('ok');
			this.check = true;
			event.target.complete();
		}, 2000);
	}
}
