import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Todo} from './todo.model';
import { Http } from '../../fakeHttp/fakeHttp';


@Injectable()

export class TodoService {

  todos: Todo [] = [];
  private api_url = 'api/';
  private todo_url = 'todos';
  private get_id_url = 'todos/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private https: Http) {
  }

  getTodo() {
    return this.https.get(this.api_url+this.todo_url);
  }

  addTodo(todoItem: string) {
    const todo: Todo = {id: 6, desc: todoItem, completed: false};
    return this.https.post(this.api_url+this.todo_url,todo)
  }

  searchById(id) {
    return this.https.get(this.api_url+this.get_id_url+id);
  }
}
