import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { TaskService } from '../../services/task.service';
import {CalendarEvent} from 'angular-calendar';

@Component({
  selector: 'app-calendar-home',
  template: `
    <md-card>
      <div class="toolbar ">
        <button md-icon-button mwlCalendarPreviousView>
          <md-icon class="md-48">chevron_left</md-icon>
        </button>
        <button md-icon-button mwlCalendarToday>
          {{viewDate | date: 'MM-dd-yyyy'}}
        </button>
        <button md-icon-button mwlCalendarNextView>
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

}
