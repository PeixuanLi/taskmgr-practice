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
import { ServicesModule } from '../services/services.module';
import { AppStoreModule } from '../reducers';
import { AppEffectsModule } from '../effects';

import 'hammerjs';
import '../utils/debug.util';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/do';



@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    AppRoutingModule,
    ServicesModule.forRoot(),
    //动画模块需放在最后
    BrowserAnimationsModule,
    AppStoreModule,
    AppEffectsModule
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
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {
        url: 'http://localhost:3000'
        // url: 'http://manage.t.imooc.io/apis',
      }
    }
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
