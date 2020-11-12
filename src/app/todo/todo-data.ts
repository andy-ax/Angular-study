import { InMemoryDbService } from 'angular-in-memory-web-api';
import {TODO} from './todo.model';

export class InMemoryTodoDbService implements InMemoryDbService {
  createDb() {
    const todos: TODO[] = [new TODO('111', '11', true)];
    return {todos};
  }
}
