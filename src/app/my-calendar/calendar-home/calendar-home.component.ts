import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { TaskService } from '../../services/task.service';
import {CalendarEvent} from 'angular-calendar';
import {addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays} from 'date-fns';
@Component({
  selector: 'app-calendar-home',
  template: `
    <md-card>
      <div class="toolbar ">
        <button 
          md-icon-button mwlCalendarPreviousView
          [view]="view$ | async"
          [(viewDate)]="viewDate">>
          <md-icon class="md-48">chevron_left</md-icon>
        </button>
        <button 
          md-button
          mwlCalendarToday
          [(viewDate)]="viewDate">>
          {{viewDate | date: 'MM-dd-yyyy'}}
        </button>
        <button 
          md-icon-button mwlCalendarNextView
          [view]="view$ | async"
          [(viewDate)]="viewDate">
          <md-icon class="md-48">chevron_right</md-icon>
        </button>
      </div>
      <div *ngIf="(events$ | async) as calEvents">
        <div [ngSwitch]="view$ | async">
          <mwl-calendar-month-view
            *ngSwitchCase="'month'"
            [viewDate]="viewDate"
            [events]="calEvents"
            [activeDayIsOpen]="activeDayIsOpen"
            (dayClicked)="dayClicked($event.day)"
            (eventClicked)="handleEvent('Clicked', $event.event)">
          </mwl-calendar-month-view>
          <mwl-calendar-week-view
            *ngSwitchCase="'week'"
            [viewDate]="viewDate"
            [events]="calEvents"
            (eventClicked)="handleEvent('Clicked', $event.event)">
          </mwl-calendar-week-view>
          <mwl-calendar-day-view
            *ngSwitchCase="'day'"
            [viewDate]="viewDate"
            [events]="calEvents"
            (eventClicked)="handleEvent('Clicked', $event.event)">
          </mwl-calendar-day-view>
        </div>
      </div>
    </md-card>
  `,
  styles: [`
    .toolbar{
      display: flex;
      flex-direction: row;
    }
    :host{
      width: 100%;
    }
  `]
})
export class CalendarHomeComponent implements OnInit {
  activeDayIsOpen = true;
  viewDate : Date;
  view$: Observable<string>;
  events$: Observable<CalendarEvent[]>;
  constructor(
    private route : ActivatedRoute,
    private store$ : Store<fromRoot.State>,
    private servive$ : TaskService,
  ) { 
    this.viewDate = new Date();
    this.view$ = this.route.paramMap.map(p =>p.get('view'));
    this.events$ = this.store$.select(fromRoot.getAuthUser).switchMap(user => {
      return this.servive$.getUserTasks(user.id)
    })
  }

  ngOnInit() {
  }
  handleEvent(action: string, event: CalendarEvent): void {
    console.log('events handled');
  }

  dayClicked({date, events}: { date: Date, events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

}
