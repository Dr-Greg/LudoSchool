import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.page.html',
	styleUrls: ['./signin.page.scss']
})
export class SigninPage implements OnInit {
	constructor(private storage: Storage) {}

	ngOnInit() {
		this.storage.set('token', 'ODAD');
	}
}
