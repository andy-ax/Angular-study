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
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  // PUT todos/:id
  toggleTodo(todo: Todo){
    const url = `${this.api_url}${this.todo_url}/${todo.id}`;
    return this.http.put(url, todo);
  }

  // GET todos
  getTodos() {
    return this.http.get(this.api_url+this.todo_url);
  }

  // POST todos
  addTodo(todoItem: string) {
    const todo: Todo = {id: this.todos.length, desc: todoItem, completed: false};
    return this.http.post(this.api_url+this.todo_url,todo)
  }

  // DELETE todos/:id
  deleteTodoById(id: number) {
    const url = `${this.api_url}${this.todo_url}/${id}`;
    return this.http.delete(url);
  }

  // GET todos/:id
  searchById(id) {
    return this.http.get(this.api_url+this.todo_url+'/'+id);
  }
}
