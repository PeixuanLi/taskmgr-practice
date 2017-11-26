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

  onInviteClick(){
    this.onInvite.emit();
  }
  onEditClick(){
    this.onEdit.emit();
  }
  onDelClick(){
    this.onDel.emit();
  }
}
