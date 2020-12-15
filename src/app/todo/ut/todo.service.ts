import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Todo} from '../../domain/entities';
import { Http } from '../../util/fakeHttp';


@Injectable()

export class TodoService{

  todos: Todo [] = [];
  userId: number;
  private api_url = 'api/';
  private todo_url = 'todos';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  // PUT todos/:id
  toggleTodo(todo: Todo, userId: number){
    const url = `${this.api_url}${this.todo_url}/${todo.id}?userId=${userId}`;
    return this.http.put(url, todo);
  }

  // GET todos
  filterTodos(filter: string, userId: number): Promise<any> {

    switch (filter) {
      case 'ACTIVE':
        return this.http.get(`${this.api_url+this.todo_url}/ACTIVE?userId=${userId}`);
      case 'COMPLETED':
        return this.http.get(`${this.api_url+this.todo_url}/COMPLETED?userId=${userId}`);
      case 'ALL':
        return this.http.get(`${this.api_url+this.todo_url}?userId=${userId}`);
    }
  }

  // POST todos
  addTodo(todoItem, userId: number) {
    return this.http.post(`${this.api_url+this.todo_url}?userId=${userId}`,todoItem)
  }

  // DELETE todos/:id
  deleteTodoById(id: number, userId: number) {
    const url = `${this.api_url}${this.todo_url}/${id}?userId=${userId}`;
    return this.http.delete(url);
  }

  // GET todos/:id
  searchById(id) {
    return this.http.get(this.api_url+this.todo_url+'/'+id);
  }


}
