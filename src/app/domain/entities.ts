interface TodoEntities {
  id: number | string;
  desc: string;
  completed: boolean;
  userId: number;
}

export class Todo implements TodoEntities {
  id: number | string;
  desc: string;
  completed: boolean;
  userId: number;
}

interface UserEntities {
  id: number;
  username: string;
  password: string;
}

export class User implements UserEntities {
  id: number;
  username: string;
  password: string;
}
