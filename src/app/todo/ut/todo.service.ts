import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {UUID} from 'angular2-uuid';
import 'rxjs/add/operator/toPromise';
import {Todo} from './todo.model';


@Injectable()

export class TodoService {

  todos: Todo [] = [];
  private api_url = 'api/todos';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getTodo() {
    return this.http.get(this.api_url);
  }

  addTodo(todoItem: string) {
    const todo = new Todo(UUID.UUID(), todoItem, false);
    this.todos.push(todo);
    return this.todos;
  }

  private handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.message || error);
  }
}
