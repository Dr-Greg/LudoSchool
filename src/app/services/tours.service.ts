import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const tourListUrl = 'https://solidaire.berwick.fr/api/cooperative/tours';

@Injectable({
	providedIn: 'root'
})
export class ToursService {
	constructor(private http: HttpClient) {}

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
}
