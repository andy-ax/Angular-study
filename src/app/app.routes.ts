import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // 无组件路由
  {
    path: 'todo',
    redirectTo: 'todo/ALL',
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];
export const routing = RouterModule.forRoot(routes);
