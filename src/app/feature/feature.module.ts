import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import * as featureBarrel from '.';
const routes: Routes = [
  { path: '', component: featureBarrel.HomeComponent },
  { path: 'home', component: featureBarrel.HomeComponent },
  { path: 'feature', loadChildren: 'app/feature/feature.module#FeatureModule'},
];

@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  declarations: [
    featureBarrel.HomeComponent
],
exports: [RouterModule]
})
export class FeatureModule { }
