import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import  { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http' 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { taskRepository } from './core/tasks/interfaces/task.repository';
import { TaskStorageService } from './infrastructure/task/TaskStorage.service';
import { TrelloService } from './infrastructure/task/trello.service';
import { TokenInterceptorService } from './infrastructure/task/token-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers:[
{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
{ provide : taskRepository, useClass: TrelloService},
{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
