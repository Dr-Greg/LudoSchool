import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.page.html',
	styleUrls: ['./welcome.page.scss']
})
export class WelcomePage implements OnInit {
	constructor(private navCtrl: NavController) {}

	ngOnInit() {}

	navSignIn() {
		this.navCtrl.navigateForward('signin');
	}

	navSignUp() {
		this.navCtrl.navigateForward('signup');
	}

	navTabs() {
		console.log('click');
		this.navCtrl.navigateRoot(['tabs', 'home']);
	}
}
