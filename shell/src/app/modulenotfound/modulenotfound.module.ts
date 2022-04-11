import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulenotfoundRoutingModule } from './modulenotfound-routing.module';
import { ModulenotfoundComponent } from './modulenotfound.component';


@NgModule({
  declarations: [
    ModulenotfoundComponent
  ],
  imports: [
    CommonModule,
    ModulenotfoundRoutingModule
  ]
})
export class ModulenotfoundModule { }
