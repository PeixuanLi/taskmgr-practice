import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
    // { path: '', component:AppComponent},
    // { path: '', redirectTo:'/login', pathMatch:'full'},
    // { path: 'projects', loadChildren:'/projects', pathMatch:'full'},
    // { path: 'tasklists', loadChildren:'/tasklists', pathMatch:'full'},
    // 设置懒加载和路由守卫 在顶层定义路由参数, 
    /**
     * 懒加载与redirectTo的区别
     * 在顶层定义路由参数, 
     * 在路由模块中不用处理路径
    */
    { path: '', redirectTo:'/login', pathMatch:'full'},
    { path: 'projects', loadChildren:'app/project#ProjectModule', pathMatch:'full', canActivate:[AuthGuardService]},
    { path: 'tasklists/:id', loadChildren:'app/task#TaskModule', canActivate:[AuthGuardService]},
    { path: 'mycal/:view', loadChildren:'app/my-calendar#MyCalendarModule', canActivate:[AuthGuardService] },

    // { path: '**', component:Code404Component}
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
