import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdToolbarModule, MdIconModule, MdButtonModule, 
  MdCardModule, MdInputModule, MdListModule, MdSlideToggleModule, 
  MdGridListModule, MdDialog, MdDialogModule, MdAutocompleteModule,
   MdMenuModule, MdCheckboxModule, MdTooltipModule,
   MdRadioModule, MdNativeDateModule, MdDatepickerModule, MdSelectModule,
   MdSidenavModule,
   MdButtonToggleModule,
   MdChipsModule,
  } from '@angular/material';
import { ComfirmDialogComponent } from './comfirm-dialog/comfirm-dialog.component';
import { DirectiveModule } from '../directive/directive.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';
import { ChipsListComponent } from './chips-list/chips-list.component';
import { IdentityInputComponent } from './identity-input/identity-input.component';
import { AreaListComponent } from './area-list/area-list.component';

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
    MdButtonToggleModule,
    MdChipsModule,
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
    MdButtonToggleModule,
    MdChipsModule,
    DirectiveModule,
    ImageListSelectComponent,
    AgeInputComponent,
    ChipsListComponent
  ],
  entryComponents: [
    ComfirmDialogComponent,
  ],  
  declarations: [
    ImageListSelectComponent,
    AgeInputComponent,
    ChipsListComponent,
    IdentityInputComponent,
    AreaListComponent,
    ComfirmDialogComponent,
  ]
})
export class SharedModule { }
