import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdToolbarModule, MdIconModule, MdButtonModule, 
  MdCardModule, MdInputModule, MdListModule, MdSlideToggleModule, 
  MdGridListModule, MdDialog, MdDialogModule, MdAutocompleteModule,
   MdMenuModule, MdCheckboxModule, MdTooltipModule,
   MdRadioModule, MdNativeDateModule, MdDatepickerModule, MdSelectModule,
   MdSidenavModule,
  } from '@angular/material';
import { ComfirmDialogComponent } from './comfirm-dialog/comfirm-dialog.component';
import { DirectiveModule } from '../directive/directive.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdToolbarModule, 
    MdIconModule, 
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdRadioModule,
    MdSelectModule,
    MdSidenavModule,
    DirectiveModule,
  ],
  //使用exports 在shared module中方便导入导出, 共享组件
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdToolbarModule, 
    MdIconModule, 
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdRadioModule,
    MdSelectModule,
    ComfirmDialogComponent,
    MdSidenavModule,
    DirectiveModule,
  ],
  entryComponents: [
    ComfirmDialogComponent,
  ],  
  declarations: [
    ComfirmDialogComponent,
  ]
})
export class SharedModule { }
