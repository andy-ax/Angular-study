import { Component, OnInit } from '@angular/core';
import { TodoService } from './ut/todo.service';
import { Todo } from '../domain/entities';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Inject } from '@angular/core';
import {UUID} from 'uuid'

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService],
})
export class TodoComponent implements OnInit {

  todos: any = [];
  desc = '';
  userId: number;

  constructor(
    // private service: TodoService,
    @Inject('todoService') private service,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.userId = parseInt(localStorage.getItem('userId'));
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let filter = params['filter'];
      this.filterTodos(filter)
    });
  }

  onTextChanges(value) {
    this.desc = value;
  }

  addTodo (desc) {
    this.desc = desc;
    let todo: Todo = {
      id: UUID.UUID(),
      desc: desc,
      completed: false,
      userId: this.userId
    };
    this.service.addTodo(todo, this.userId).then(data=>{
      if (data) {
        this.todos = data;
      }
    });
    this.desc = '';
  }

  toggleTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    todo.completed = !todo.completed;
    this.service.toggleTodo(todo, this.userId).then(data=>{
      this.todos = data;
    })
  }

  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service.deleteTodoById(todo.id, this.userId).then(data=>{
      this.todos = data;
    })
  }

  filterTodos(filter: string = 'ALL') {
    this.service.filterTodos(filter, this.userId).then(data => {
      this.todos = data;
    });
  }

}
