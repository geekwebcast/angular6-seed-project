import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const coreRoutes: Routes = [
 {
  path: '',
  children:[
    {
      path: '',
      loadChildren:  'app/core/auth/auth.module#AuthModule'
    },
]}];
@NgModule({
  imports: [RouterModule.forChild(coreRoutes)],
  exports: [RouterModule]
})
export class CoreModuleRoutingModule { }
