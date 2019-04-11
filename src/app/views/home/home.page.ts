import { NavController } from '@ionic/angular';
import { TabsPage } from './../tabs/tabs.page';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
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

	constructor(private navCtrl: NavController) {}

	ngOnInit() {}

	browsCourses() {
		this.navCtrl.navigateForward(['tabs', 'search']);
	}

	doRefresh(event) {
		setTimeout(() => {
			event.target.complete();
		}, 2000);
	}
}
