import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpModule } from '@angular/http';
import { MdIconRegistry } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { loadSvgResources } from "../utils/svg.util" ;
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from '../app-routing.module';
import 'hammerjs';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    AppRoutingModule,
    //动画模块需放在最后
    BrowserAnimationsModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent, 
     SidebarComponent
    ],
  //如果不导出, 其内部的组件在其他模块中将无法使用
  exports: [
    HeaderComponent,
    FooterComponent, 
    SidebarComponent,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
})
export class CoreModule { 


  //SkipSelf 不要在自己打转, 去父级寻找
  //Optional 第一次加载, 可选依赖, 如果不存在就正常运行构造,如果有在抛出异常
  constructor(@Optional() @SkipSelf() parent:CoreModule,
  ir: MdIconRegistry,
  ds: DomSanitizer){
    if (parent){
      throw new Error('模块已经存在,不能再次加载');
    }
    loadSvgResources(ir,ds);
  }

}
