import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()
  toggle = new EventEmitter<void>();

  @Output()
  toggleDarkTheme = new EventEmitter<boolean>();
  //导入了一个svg icon (需要http模块 )
  constructor() {
    
   }

  ngOnInit() {
  }

  openSidebar(){
    this.toggle.emit();
  }
  onChange(checked: boolean){
    this.toggleDarkTheme.emit(checked);
  }
}
