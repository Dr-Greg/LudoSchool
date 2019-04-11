import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-search',
	templateUrl: './search.page.html',
	styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
	check = false;

	//#region object
	courses = [
		{
			url: 'https://google.com',
			image: 'https://oc-course.imgix.net/courses/4192086/4192086_teaser_picture_1522246488.jpg',
			titre: 'cours zbbi',
			temps: 'moyen'
		},
		{
			url: 'https://google.com',
			image: 'https://oc-course.imgix.net/courses/4192086/4192086_teaser_picture_1522246488.jpg',
			titre: 'cours zbbi',
			temps: 'moyen'
		},
		{
			url: 'https://google.com',
			image: 'https://oc-course.imgix.net/courses/4192086/4192086_teaser_picture_1522246488.jpg',
			titre: 'cours zbbi',
			temps: 'moyen'
		},
		{
			url: 'https://google.com',
			image: 'https://oc-course.imgix.net/courses/4192086/4192086_teaser_picture_1522246488.jpg',
			titre: 'cours zbbi',
			temps: 'moyen'
		},
		{
			url: 'https://google.com',
			image: 'https://oc-course.imgix.net/courses/4192086/4192086_teaser_picture_1522246488.jpg',
			titre: 'cours zbbi',
			temps: 'moyen'
		},
		{
			url: 'https://google.com',
			image: 'https://oc-course.imgix.net/courses/4192086/4192086_teaser_picture_1522246488.jpg',
			titre: 'cours zbbi',
			temps: 'moyen'
		},
		{
			url: 'https://google.com',
			image: 'https://oc-course.imgix.net/courses/4192086/4192086_teaser_picture_1522246488.jpg',
			titre: 'cours zbbi',
			temps: 'moyen'
		},
		{
			url: 'https://google.com',
			image: 'https://oc-course.imgix.net/courses/4192086/4192086_teaser_picture_1522246488.jpg',
			titre: 'cours zbbi',
			temps: 'moyen'
		},
		{
			url: 'https://google.com',
			image: 'https://oc-course.imgix.net/courses/4192086/4192086_teaser_picture_1522246488.jpg',
			titre: 'cours zbbi',
			temps: 'moyen'
		},
		{
			url: 'https://google.com',
			image: 'https://oc-course.imgix.net/courses/4192086/4192086_teaser_picture_1522246488.jpg',
			titre: 'cours zbbi',
			temps: 'moyen'
		}
	];
	//#endregion

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
