import { NgModule } from '@angular/core';
import { CalendarHomeComponent } from './calendar-home/calendar-home.component';
import { CalendarModule } from 'angular-calendar';
import { MyCalendarRoutingModule } from './my-calendar-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CalendarModule.forRoot(),
    MyCalendarRoutingModule,
  ],
  declarations: [CalendarHomeComponent]
})
export class MyCalendarModule { }
