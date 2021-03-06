import { Component, OnInit, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { itemAnim } from '../../anim/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [itemAnim], 
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent implements OnInit {
  
  @Input() item;
  @Input() avatar;
  @Output() taskClick = new EventEmitter<void>();
  @Output() taskComplete = new EventEmitter<void>();
  widerPriority ='in';
  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner? this.item.owner.avatar: "unassigned";
  }
  onCheckboxClick(ev:Event){
    ev.stopPropagation();
    this.taskComplete.emit();
  }
  itemClicked(ev: Event) {
    ev.preventDefault();
    this.taskClick.emit();
  }
 

  //鼠标进入动画
  @HostListener('mouseenter')
  onMouseEnter(){
    this.widerPriority = 'out';
  }
  //鼠标离开动画
  @HostListener('mouseleave')
  onMouseLeave(){
    this.widerPriority = 'in';
  }
}
