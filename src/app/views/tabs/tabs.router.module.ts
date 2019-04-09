import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/tabs/home',
		pathMatch: 'full'
		// CAN activate
	},
	{
		path: 'tabs',
		component: TabsPage,
		//canActivate: [AuthGuard],
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
			},
			{
				path: 'profile',
				children: [
					{
						path: '',
						loadChildren: '../profile/profile.module#ProfilePageModule'
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
