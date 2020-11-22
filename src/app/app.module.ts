// angular自带
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// 模块
import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { AuthService } from './core/auth.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTodoDbService } from './todo/ut/todo-data';
import { Http } from './fakeHttp/fakeHttp';

// 组件/页面
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';
import { TodoFooterComponent } from './todo/todo-footer/todo-footer.component';
import { TodoHeaderComponent } from './todo/todo-header/todo-header.component';

Http.forRoot([InMemoryTodoDbService]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoComponent,
    TodoFooterComponent,
    TodoHeaderComponent,
  ],
  imports: [
    // 只要app运行在浏览器就必须引入该模块
    BrowserModule,
    // 表单与双向绑定
    FormsModule,
    // HTTP请求与响应
    HttpClientModule,
    // 路由
    routing
  ],
  providers: [
    {provide: 'auth', useClass: AuthService},
    HttpClientModule,
    Http,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
