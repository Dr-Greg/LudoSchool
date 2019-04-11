import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.page.html',
	styleUrls: ['./welcome.page.scss']
})
export class WelcomePage implements OnInit {
	constructor(
		private navCtrl: NavController,
		private storage: Storage,
		private platform: Platform,
		private authService: AuthenticationService,
		private router: Router
	) {}

	ngOnInit() {
		this.platform.ready().then(() => {
			this.authService.authenticationState.subscribe((signin) => {
				if (signin) {
					this.router.navigate(['tabs', 'home']);
				} else {
					this.router.navigate(['welcome']);
				}
			});
		});
	}

	navSignIn() {
		this.authService.checkToken();
		if (this.authService.isAuthenticated()) {
			this.router.navigate(['welcome']);
		} else {
			this.navCtrl.navigateForward('signin');
		}
	}

	navSignUp() {
		this.navCtrl.navigateForward('signup');
	}

	navTabs() {
		this.navCtrl.navigateRoot(['tabs', 'home']);
	}
}
