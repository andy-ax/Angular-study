import {Routes, RouterModule} from '@angular/router';
import {TodoComponent} from './todo.component';
import {AuthGuardService} from '../core/auth-guard.service';

export const routes: Routes = [
  {
    path: 'todo',
    canActivate: [AuthGuardService],
    redirectTo: 'todo/ALL',
  },
  {
    path: 'todo/ALL',
    canActivate: [AuthGuardService],
    component: TodoComponent,
  },
  {
    path: 'todo/:filter',
    canActivate: [AuthGuardService],
    component: TodoComponent,
  }
];
export const routing = RouterModule.forChild(routes);
