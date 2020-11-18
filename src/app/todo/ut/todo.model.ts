interface TodoModel {
  id: number;
  desc: string;
  completed: boolean;
}

export class Todo implements TodoModel {
  id: number;
  desc: string;
  completed: boolean;
}
