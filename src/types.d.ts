nexport interface Collection {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  todos: Todo[];
}

export interface FormCollection extends Omit<"created_at"> {}

export interface Todo {
  id: string;
  name: string;
  priority: string;
  is_done: boolean;
  created_at: Date;
}

// Component Props
export interface TodoItemProp {
  todo: Todo;
  isSelected: boolean;
}

export interface ProgressBarProp {
  totalDoneTodos: number;
  totalTodos: number;
}

export interface FormCollectionProp {
  form: FormCollection;
  isEdit: boolean;
}

export interface ExampleJsonProp {
  json: Collection;
}
