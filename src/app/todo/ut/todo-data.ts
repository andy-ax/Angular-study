import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Todo} from './todo.model';

export class InMemoryTodoDbService implements InMemoryDbService {
  createDb() {
    const todos = [
      new Todo('1', '111', false),
      new Todo('2', '222', false),
      new Todo('3', '333', true),
      new Todo('4', '444', false),
      new Todo('5', '555', false),
      new Todo('6', '666', false),
      new Todo('7', '777', false),
    ];
    return {todos};
  }

  getId(todos: Todo[]): number {
    let num: number;
    if (todos.length > 0) {
      num = Math.max(...todos.map(todo => todo.id)) + 1;
    } else {
      num = 11;
    }
    return num;
  }
}
