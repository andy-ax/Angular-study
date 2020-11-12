// angular自带
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// 模块
import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { AuthService } from './core/auth.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTodoDbService } from './todo/todo-data';

// 组件/页面
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoComponent
  ],
  imports: [
    // 只要app运行在浏览器就必须引入该模块
    BrowserModule,
    // 表单与双向绑定
    FormsModule,
    // HTTP请求与响应
    HttpModule,
    // 路由
    routing,
    InMemoryWebApiModule.forRoot(InMemoryTodoDbService),
  ],
  providers: [
    {provide: 'auth', useClass: AuthService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
