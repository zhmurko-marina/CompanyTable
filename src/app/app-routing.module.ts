import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';

// Guards
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'main-page',
    component: MainPageComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'edit-page/:id',
    component: EditPageComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: '',
    component: LoginComponent
  },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {
}
