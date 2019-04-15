import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/tabs/home',
		pathMatch: 'full',
		canActivate: [AuthGuardService]
	},
	{
		path: 'tabs',
		component: TabsPage,
		canActivate: [AuthGuardService],
		children: [
			{
				path: '',
				redirectTo: '/tabs/home',
				pathMatch: 'full'
			},
			{
				path: 'home',
				children: [
					{
						path: '',
						loadChildren: '../home/home.module#HomePageModule'
					}
				]
			},
			{
				path: 'search',
				children: [
					{
						path: '',
						loadChildren: '../search/search.module#SearchPageModule'
					}
				]
			},
			{
				path: 'sell',
				children: [
					{
						path: '',
						loadChildren: '../sell/sell.module#SellPageModule'
					}
				]
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TabsPageRoutingModule {}
