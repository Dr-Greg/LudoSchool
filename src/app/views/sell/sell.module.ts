import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SellPage } from './sell.page';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild([{ path: '', component: SellPage }])],
	declarations: [SellPage]
})
export class SellPageModule {}
