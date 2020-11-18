import { Component, OnInit } from '@angular/core';
import { TodoService } from './ut/todo.service';
import { Todo } from './ut/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService],
})
export class TodoComponent implements OnInit {

  todos: any = [];
  desc = '';

  constructor(private service: TodoService) {}

  ngOnInit() {
    const self = this;
    this.getTodos();
  }

  addTodo () {
    this.service.addTodo(this.desc).then(data=>{
      if (data) {
        this.todos = data;
      }
    });
    this.desc = '';
  }

  toggleTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service.toggleTodo(todo).then(data=>{
      this.todos = data;
    })
  }

  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service.deleteTodoById(todo.id).then(data=>{
      this.todos = data;
    })
  }

  getTodos() {
    this.service.getTodos().then(data => {
      this.todos = data;
    });
  }

}
