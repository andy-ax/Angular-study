import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {Auth} from '../domain/entities';

// Component 是ng提供的装饰器函数 用来描述Component的元数据 是组件的装饰器
@Component({
  //  selector 是指这个组件在HTML模板中的标签上什么
  selector: 'app-login',
  //  template是嵌入的HTML模板，如果使用单独的文件可使用 templateUrl
  template: `
    <div>
      <form #formRef="ngForm" (ngSubmit)="onSubmit(formRef.value)">
        <fieldset ngModelGroup="login">
          <input type="text" 
            name="username"
            [(ngModel)]="username"
            #usernameRef="ngModel"
            required
            minlength="3"
          />
          <div *ngIf="usernameRef.errors">{{usernameRef.errors | json }}</div>
          <div *ngIf="usernameRef.errors?.required">this is required</div>
          <div *ngIf="usernameRef.errors?.minlegth">should be at least 3 charactors</div>
          <div *ngIf="auth?.hasError">{{auth.errMsg}}</div>
          <input type="password"
            name="password"
            [(ngModel)]="password"
            #passwordRef="ngModel"
            required
          />
          <div *ngIf="passwordRef.errors?.required">this is required</div>
          <button type="submit">submit</button> 
        </fieldset>
      </form>  
    </div>
  `,
  //  style是嵌入的css样式，如果使用单独的文件可使用 styleUrls
  styles: [],
})
export class LoginComponent implements OnInit {
  text: String = 'Hello LoginComponent';
  public username = '';
  public password = '';
  auth: Auth;

  constructor(@Inject('auth') private service, private router: Router) { }

  ngOnInit() {
  }

  private onSubmit (formValue): void {
    this.service.
    loginWithCredentials(formValue.login.username, formValue.login.password).
    then(auth => {
      let redirectUrl = auth.redirectUrl;
      if (redirectUrl === null) redirectUrl = '/';

      if (!auth.hasError) {
        location.href = redirectUrl;
        localStorage.removeItem('redirectUrl');
      } else {
        this.auth = Object.assign({}, auth);
      }
    })
  }

}
