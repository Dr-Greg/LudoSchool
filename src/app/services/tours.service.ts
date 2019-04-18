import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

const tourListUrl = 'https://solidaire.berwick.fr/api/cooperative/tours';
const itemListUrl = 'https://solidaire.berwick.fr/api/cooperative/items';
const itemDetailUrl = 'https://solidaire.berwick.fr/api/cooperative/item';
const addItemUrl = 'https://solidaire.berwick.fr/api/cooperative/buy';

@Injectable({
	providedIn: 'root'
})
export class ToursService {
	constructor(private http: HttpClient, private storage: Storage) {}

	toursList(cooperative_id: number) {
		return new Promise((resolve, reject) => {
			this.http.post(tourListUrl, { cooperative_id }).subscribe(
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

	itemList(cooperative_id: number, from: number, to: number) {
		return new Promise((resolve, reject) => {
			this.http.post(itemListUrl, { cooperative_id, from, to }).subscribe(
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

	getToursList(): Promise<any> {
		const cooperative_id = localStorage.getItem('coopId');
		return new Promise((resolve, reject) => {
			this.http.post(addItemUrl, { cooperative_id }).subscribe(
				(res) => {
					console.table(res['data']);
					resolve(res);
				},
				(err) => {
					console.log(err);
					reject(err);
				}
			);
		});
	}

	buyItem(cooperative_id: number, from: number, to: number) {
		return new Promise((resolve, reject) => {
			this.http.post(addItemUrl, { cooperative_id, from, to }).subscribe(
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
