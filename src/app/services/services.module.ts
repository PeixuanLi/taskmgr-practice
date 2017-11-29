import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

@NgModule()
export class ServicesModule { 
  static forRoot(): ModuleWithProviders{
    return {
      ngModule:ServicesModule,
      providers:[]
    }
  }
}
