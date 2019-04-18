import { CoursesService } from './../../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-formationmodal',
	templateUrl: './formationmodal.page.html',
	styleUrls: ['./formationmodal.page.scss']
})
export class FormationmodalPage implements OnInit {
	courseShort;
	courseLong;
	wifiOn: boolean = false;

	chapters = [];
	chapterContent = {};

	questionsList = [];
	question;
	questionIndex = 0;
	quizCompleted = false;

	responses = [];

	constructor(private storage: Storage, private modalCtrl: ModalController, private coursesService: CoursesService) {}

	ngOnInit() {
		this.storage.get('wifi_on_off').then((wifiOn) => {
			this.wifiOn = wifiOn === 'on' ? true : false;

			if (wifiOn === 'on') {
				this.coursesService
					.formationDetails(this.courseShort['id'])
					.then((res) => {
						if (res) {
							console.table(res['data']);
							this.courseLong = res['data'];
							if (this.courseLong.chapters.length > 0) {
								this.chapters = this.courseLong['chapters'];
								this.chapterContent = this.chapters[0];
							}
						}
					})
					.catch(async (err) => {});
			} else {
				this.storage.get('course_' + this.courseShort['id']).then((courseLong) => {
					if (courseLong) {
						this.courseLong = JSON.parse(courseLong);
						console.log(courseLong);
					}
				});
			}
		});
	}

	closeModal() {
		this.modalCtrl.dismiss();
	}

	selectChapter(index: number) {
		this.chapterContent = this.courseLong['chapters'][index];
		this.questionIndex = 0;

		if (this.chapterContent['type'] === 'quizz') {
			this.questionsList = this.chapterContent['questions'];
			this.question = this.questionsList[this.questionIndex];
		}
	}

	addAnswer(answer) {
		const response = { question_id: this.question.id, response_id: answer.id };
		this.responses.push(response);
		this.nextQuestion();
	}

	nextQuestion() {
		if (this.questionIndex < this.questionsList.length - 1) {
			this.questionIndex++;
			this.question = this.questionsList[this.questionIndex];
		} else {
			this.quizCompleted = true;
			console.log(this.responses);
			this.coursesService.sendQuizAnswer(27, this.chapterContent.formation_id, this.chapterContent.id, this.responses);
		}
	}

	hasNext() {
		return this.questionIndex < this.questionsList.length ? 'Suivant' : 'Terminer';
	}

	isAchieved(chapter) {
		return chapter.is_achieved === 'false' ? 'danger' : 'primary';
	}
}
