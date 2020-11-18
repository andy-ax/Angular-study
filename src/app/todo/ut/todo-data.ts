import {Http} from '../../fakeHttp/fakeHttp';
import {Todo} from './todo.model';

export class InMemoryTodoDbService extends Http{
  private todos: Todo[] = [
    {id: 1, desc: '222', completed: false},
    {id: 2, desc: '333', completed: false},
    {id: 3, desc: '098', completed: false},
    {id: 4, desc: '234', completed: false},
    {id: 5, desc: '342', completed: false},
  ];

  constructor(){
    super();
    super.addRule(':id',/:id/g,'([0-9]+)');
    super.setRoute('api/todos', 'get', this.getTodo.bind(this));
    super.setRoute('api/todos', 'post', this.postTodo.bind(this));
    super.setRoute('api/todos/:id', 'get', this.searchById.bind(this));
    super.setRoute('api/todos/:id', 'put', this.toggleTodo.bind(this));
    super.setRoute('api/todos/:id', 'delete', this.deleteTodo.bind(this));
  }

  getTodo() {
    return new Promise((res) => {
      res(this.todos);
    });
  }

  postTodo(todo: Todo) {
    return new Promise((res) => {
      this.todos.push(todo);
      res(this.todos);
    });
  }

  searchById(data: undefined, id: number|string) {
    return new Promise((res)=>{
      const item = this.todos.find(item=>item.id == id);
      res(item);
    })
  }

  toggleTodo(data: Todo, id: number|string) {
    return new Promise((res)=>{
      const item = this.todos.find(item=>item.id == id);
      item.desc = data.desc;
      item.completed = data.completed;
      res(this.todos);
    })
  }

  deleteTodo(data: undefined, id: number|string) {
    return new Promise((res)=>{
      const index = this.todos.findIndex(item=>item.id == id);
      const todos = this.todos;
      this.todos = todos.slice(0, index).concat(todos.slice(index+1));
      res(this.todos);
    })
  }
}
