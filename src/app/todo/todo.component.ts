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
    const r = this.service.getTodo().then(data => {
      self.todos = data;
    });
  }

  addTodo () {
    this.service.addTodo(this.desc).then(data=>{
      if (data) {
        this.todos = data;
      }
    });
    this.desc = '';
  }

}
