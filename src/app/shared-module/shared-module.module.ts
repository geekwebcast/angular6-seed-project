import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as sharedBarrel from '.'; 

@NgModule({
  imports: [
    CommonModule,
    sharedBarrel.SharedModuleRoutingModule
  ],
  declarations: [
    sharedBarrel.HeaderComponent,
    sharedBarrel.FooterComponent,
    sharedBarrel.LoaderDirective   
],
providers: [sharedBarrel.LoaderService],
  exports: [
    sharedBarrel.HeaderComponent,
    sharedBarrel.FooterComponent,
    sharedBarrel.LoaderDirective
  ]
})
export class SharedModuleModule { }
