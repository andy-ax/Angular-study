import {Routes, RouterModule} from '@angular/router';
import {TodoComponent} from './todo.component';

export const routes: Routes = [
  {
    path: 'todo',
    redirectTo: 'todo/ALL',
  },
  {
    path: 'todo/ALL',
    component: TodoComponent,
  },
  {
    path: 'todo/:filter',
    component: TodoComponent,
  }
];
export const routing = RouterModule.forChild(routes);
