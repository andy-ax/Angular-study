export class Todo {
  public id: number;
  public desc: string;
  public completed: boolean;
  constructor(id, desc, completed) {
    this.id = id;
    this.desc = desc;
    this.completed = completed;
  }
}
