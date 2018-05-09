// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import * as authBarrel from ".";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: authBarrel.LoginComponent },
  { path: 'signup', component: authBarrel.RegisterComponent },
  { path: 'reset-password', component: authBarrel.ResetPasswordComponent },
];
export const authRouter = RouterModule.forChild(routes );
@NgModule({
    imports: [
      authRouter,
      FormsModule,
      SweetAlert2Module
    ],
    declarations: [
      authBarrel.AuthComponent,
      authBarrel.LoginComponent,
      authBarrel.ResetPasswordComponent,
      authBarrel.RegisterComponent
    ],
    providers: [authBarrel.AuthService],
    exports: [
      RouterModule,SweetAlert2Module
    ]
})
export class AuthModule {

}
