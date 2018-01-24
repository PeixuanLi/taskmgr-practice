import { Component, OnInit, Input, Output, EventEmitter,HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { cardAnim } from '../../anim/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations:[
    cardAnim
  ],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output() onInvite = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDel = new EventEmitter<void>();
  @Output() onSelected= new EventEmitter<void>();

  //绑定动画元素
  @HostBinding('@card') cardState = 'out';

  constructor() { }
  ngOnInit() {
  }


  //鼠标进入动画
  @HostListener('mouseenter')
  onMouseEnter(){
    this.cardState = 'hover';
  }
  //鼠标离开动画
  @HostListener('mouseleave')
  onMouseLeave(){
    this.cardState = 'out';
  }

  onInviteClick(event:Event){
    // event.preventDefault();
    event.stopPropagation();
    this.onInvite.emit();
  }
  onEditClick(event:Event){
    event.preventDefault();
    event.stopPropagation();
    this.onEdit.emit();
  }
  onDelClick(event:Event){
    event.preventDefault();
    event.stopPropagation();
    this.onDel.emit();
  }
  onClick(event:Event){
    event.preventDefault();
    this.onSelected.emit();
  }
}
