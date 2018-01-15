import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { ProjectService } from './project.service';
import { QuoteService } from './quote.service';
import { TaskListService } from './task-list.service';
import { TaskService } from './task.service';
import { userService } from './user.service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
export {
  ProjectService,
}

@NgModule()
export class ServicesModule { 
  static forRoot(): ModuleWithProviders{
    return {
      ngModule:ServicesModule,
      providers:[
        QuoteService,
        ProjectService,
        TaskListService,
        TaskService,
        userService,
        AuthService,
        AuthGuardService,
      ]
    }
  }
}
