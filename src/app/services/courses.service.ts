import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

/* DISCOVERS FORMATIONS VIEW */
const formationsUrl = 'https://solidaire.berwick.fr/api/formations';
const searchFormationsUrl = 'https://solidaire.berwick.fr/api/formations/search	';
const followFormationUrl = 'https://solidaire.berwick.fr/api/formations/follow';

/* FORMATIONS VIEW */
const followedFormationsUrl = 'https://solidaire.berwick.fr/api/formations/followed';
const formationDetailsUrl = 'https://solidaire.berwick.fr/api/formation';

const quizAnswerUrl = 'https://solidaire.berwick.fr/api/chapters/answerQuizz';
const lessonValidateUrl = 'https://solidaire.berwick.fr/api/chapters/validateLesson';
let submitUrl = 'https://solidaire.berwick.fr/api/submissions/submit';

@Injectable({
	providedIn: 'root'
})
export class CoursesService {
	constructor(private storage: Storage, private http: HttpClient, private transfer: FileTransfer) {}

	uploadPhoto(cooperative_id: number, formation_id: number, chapter_id: number, medias) {
		submitUrl += '?cooperative_id=' + cooperative_id + '&formation_id=' + formation_id + '&chapter_id=' + chapter_id;
		const fileTransfer: FileTransferObject = this.transfer.create();
		const options: FileUploadOptions = {
			fileKey: 'medias[]',
			fileName: medias,
			chunkedMode: false,
			mimeType: 'image/jpeg',
			headers: { 'x-ov-token': localStorage.getItem('token') }
		};

		return new Promise((resolve, reject) => {
			fileTransfer.upload(medias, submitUrl, options).then(
				(data) => {
					console.log('\n\nDATA UPLOAD : ' + data + '\n\n');
					resolve(data);
				},
				(err) => {
					console.log('\n\nDATA UPLOAD : ' + err + '\n\n');
					reject(err);
				}
			);
		});
	}

	lessonValidate(cooperative_id: number, formation_id: number, chapter_id: number) {
		return new Promise((resolve, reject) => {
			this.http.post(lessonValidateUrl, { cooperative_id, formation_id, chapter_id }).subscribe(
				(res) => {
					resolve(res);
					console.log(res);
				},
				(err) => {
					console.log(err);
					reject(err);
				}
			);
		});
	}

	sendQuizAnswer(cooperative_id: number, formation_id: number, chapter_id: number, responses) {
		return new Promise((resolve, reject) => {
			this.http.post(quizAnswerUrl, { cooperative_id, formation_id, chapter_id, responses }).subscribe(
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

	loadFollowFormations() {
		return new Promise((resolve, reject) => {
			this.http.post(followedFormationsUrl, {}).subscribe(
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

	loadFormations(pagination_start: number, interval: number, cooperative_id: number) {
		return new Promise((resolve, reject) => {
			this.http.post(formationsUrl, { interval, pagination_start, cooperative_id }).subscribe(
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

	loadFormationsWith(pattern: string, pagination_start: number, interval: number, cooperative_id: number) {
		return new Promise((resolve, reject) => {
			this.http.post(searchFormationsUrl, { interval, pagination_start, cooperative_id, pattern }).subscribe(
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

	followFormations(formation_id: number, cooperative_idd: number) {
		const cooperative_id = localStorage.getItem('coopId');
		return new Promise((resolve, reject) => {
			this.http.post(followFormationUrl, { formation_id, cooperative_id }).subscribe(
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

	formationDetails(formation_id: number) {
		return new Promise((resolve, reject) => {
			this.http.post(formationDetailsUrl, { formation_id }).subscribe(
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
