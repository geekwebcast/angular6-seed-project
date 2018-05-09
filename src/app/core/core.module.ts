import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as coreBarrel from '.';


@NgModule({
  imports: [
    CommonModule,
    coreBarrel.CoreModuleRoutingModule
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class CoreModule { }
