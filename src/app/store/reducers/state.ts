import { TodoModel } from 'app/models';

export interface RootState {
  todos: RootState.TodoState;
  router?: any;
}

export type TodoState = TodoModel[];
