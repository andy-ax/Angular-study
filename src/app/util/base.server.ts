import {Http} from './fakeHttp';
import {Todo, User} from '../domain/entities';
import * as value from '../data.json';

export class InMemoryTodoDbService extends Http{
  private todos: Todo[] = (<any>value).todos;
  private users: User[] = (<any>value).users;

  constructor(){
    super();
    super.addRule(':id',/:id/g,'([0-9]+)');
    super.setRoute('api/todos', 'get', this.getTodo.bind(this));
    super.setRoute('api/todos', 'post', this.addTodo.bind(this));
    super.setRoute('api/todos/:id', 'get', this.searchById.bind(this));
    super.setRoute('api/todos/:id', 'put', this.toggleTodo.bind(this));
    super.setRoute('api/todos/:id', 'delete', this.deleteTodo.bind(this));
    super.setRoute('api/todos/ACTIVE', 'get', this.getActive.bind(this));
    super.setRoute('api/todos/COMPLETED', 'get', this.getCompleted.bind(this));
    super.setRoute('api/users', 'get', this.getUser.bind(this));
  }

  getTodo(data: undefined, query) {
    return new Promise((res) => {
      const id = query.userId;
      const result = this.getTodoByUserId(id);
      res(result);
    });
  }

  addTodo(todo: Todo) {
    return new Promise((res) => {
      this.todos.push(todo);
      res(this.todos);
    });
  }

  searchById(data: undefined, query, id: number|string) {
    return new Promise((res)=>{
      const item = this.todos.find(item=>item.id == id);
      res(item);
    })
  }

  toggleTodo(data: Todo, query, id: number|string) {
    return new Promise((res)=>{
      const item = this.todos.find(item => item.id == id && item.userId == query.userId);
      if (item) {
        item.desc = data.desc;
        item.completed = data.completed;
      }
      res(this.getTodoByUserId(query.userId));
    })
  }

  deleteTodo(data: undefined, query, id: number|string) {
    return new Promise((res)=>{
      const index = this.todos.findIndex(item=>item.id == id && item.userId == query.userId);
      if (index || index === 0) {
        const todos = this.todos;
        this.todos = todos.slice(0, index).concat(todos.slice(index+1));
      }
      res(this.getTodoByUserId(query.userId));
    })
  }

  getActive(data: undefined, query){
    return new Promise(res=>{
      const id = query.userId;
      const result = this.todos.filter(x=>(x.userId == id && x.completed === false));
      res(result);
    })
  }

  getCompleted(todos: Todo[], query){
    return new Promise(res=>{
      const id = query.userId;
      const result = this.todos.filter(x=>(x.userId == id && x.completed === true));
      res(result);
    })
  }

  getUser(data, query) {
    return new Promise(res => {
      const user = this.users.find(x => x.username === query.username);
      res([user]);
    })
  }

  private getTodoByUserId(id) {
    return this.todos.filter(x=>x.userId == id)
  }
}
