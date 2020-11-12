import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { TODO } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService],
})
export class TodoComponent implements OnInit {

  todos: TODO[] = [];
  desc = '';

  constructor(private service: TodoService) {}

  ngOnInit() {
  }

  addTodo () {
    this.service.addTodo(this.desc).then(todos=>{
      debugger;
    });
    this.desc = '';
  }

}
