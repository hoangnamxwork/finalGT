import { authGuard } from 'src/app/shared/archived/auth-guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthClassGuard } from './shared/guards/auth-class.guard';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: ()=> import('./auth/auth.module').then((m)=> m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: "full"
  },
  {
    path: 'home',
    loadChildren: ()=> import('./pages/home/home.module').then((m)=> m.HomeModule),
    /*canActivate: [AuthClassGuard]*/
  },
  {
    path:'admin',
    loadChildren:()=> import('./pages/admin/admin.module').then((m) => m.AdminModule),
    /*canActivate: [AuthClassGuard]*/
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
