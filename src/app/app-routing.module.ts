import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

const routes: Routes = [
    // { path: '', component:AppComponent},
    { path: '', redirectTo:'/login', pathMatch:'full'},
    { path: 'projects', redirectTo:'/projects', pathMatch:'full'},
    { path: 'tasklists', redirectTo:'/tasklists', pathMatch:'full'},

    // { path: '**', component:Code404Component}
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
