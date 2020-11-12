import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { TODO } from './todo.model';
import { UUID } from 'angular2-uuid';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TodoService {

  todos: TODO [] = [];
  private api_url = 'fake_url/todos';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  addTodo(todoItem: string) {
    const todo = new TODO(UUID.UUID(), todoItem, false);
    this.todos.push(todo);
    return this.todos;
  }

  private handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.message || error);
  }
}
