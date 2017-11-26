import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class TaskHeaderComponent implements OnInit {
  @Input() header;
  @Output() newTask = new EventEmitter<void>();
  @Output() moveAll = new EventEmitter<void>();
  @Output() delList = new EventEmitter<void>();
  @Output() editList = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  addNewTask(){
    this.newTask.emit();
  }
  onChangeListName(){
    this.editList.emit();
  }
  onMoveAllTasks(){
    this.moveAll.emit();
  }
  onDeleteList(){
    this.delList.emit();
  }
}
