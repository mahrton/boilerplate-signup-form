import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./components/pages/sign-up/sign-up.component";
import {SuccessComponent} from "./components/pages/success/success.component";

const routes: Routes = [
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'success',
    component: SuccessComponent
  },
  {
    path: '**', redirectTo: '/signup',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
