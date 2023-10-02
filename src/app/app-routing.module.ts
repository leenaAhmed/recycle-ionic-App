import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full',
  },

  {
    path: 'loader',
    loadChildren: () =>
      import('./pages/loader/loader.module').then((m) => m.LoaderPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./authentaction/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./authentaction/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./dashbored/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'pickup-call',
    loadChildren: () => import('./dashbored/pickup-call/pickup-call.module').then( m => m.PickupCallPageModule)
  },
  {
    path: 'pickup-calls',
    loadChildren: () => import('./dashbored/pickup-calls/pickup-calls.module').then( m => m.PickupCallsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
