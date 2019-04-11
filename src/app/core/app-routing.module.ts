import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
	{ path: '', loadChildren: '../views/tabs/tabs.module#TabsPageModule', canActivate: [AuthGuardService] },
	{ path: 'welcome', loadChildren: '../public/welcome/welcome.module#WelcomePageModule' },
	{ path: 'signin', loadChildren: '../public/signin/signin.module#SigninPageModule' },
	{ path: 'signup', loadChildren: '../public/signup/signup.module#SignupPageModule' }
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
