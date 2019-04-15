import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

const coursesUrl = 'http://';
const formationsUrl = 'http://';

@Injectable({
	providedIn: 'root'
})
export class CoursesService {
	constructor(private storage: Storage, private http: HttpClient) {}

	loadFollowFormations() {
		return new Promise((resolve, reject) => {
			this.http.post(coursesUrl, {}).subscribe(
				(res) => {
					resolve(res);
				},
				(err) => {
					console.log(err);
					reject(err);
				}
			);
		});
	}

	loadFormations() {
		return new Promise((resolve, reject) => {
			this.http.post(formationsUrl, {}).subscribe(
				(res) => {
					resolve(res);
				},
				(err) => {
					console.log(err);
					reject(err);
				}
			);
		});
	}
}
