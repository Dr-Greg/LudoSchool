import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.page.html',
	styleUrls: ['./welcome.page.scss']
})
export class WelcomePage implements OnInit {
	constructor(private navCtrl: NavController, private storage: Storage) {}

	ngOnInit() {
		this.storage.set('token', 'aada');
	}

	navSignIn() {
		this.navCtrl.navigateForward('signin');
	}

	navSignUp() {
		this.navCtrl.navigateForward('signup');
	}

	navTabs() {
		this.navCtrl.navigateRoot(['tabs', 'home']);
	}
}
