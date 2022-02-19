import { TodoModel } from 'app/models';
import { ADD_TODO, CLEAR_COMPLETED, COMPLETE_ALL, COMPLETE_TODO, DELETE_TODO, EDIT_TODO } from './actionTypes';
/*
export const addTodo = createAction<Partial<TodoModel, 'text'>>(Type.ADD_TODO);
  export const editTodo = createAction<Partial<TodoModel, 'id'>>(Type.EDIT_TODO);
  export const deleteTodo = createAction<TodoModel['id']>(Type.DELETE_TODO);
  export const completeTodo = createAction<TodoModel['id']>(Type.COMPLETE_TODO);
  export const completeAll = createAction(Type.COMPLETE_ALL);
  export const clearCompleted = createAction(Type.CLEAR_COMPLETED); */

export const ADDTODO = () => ({ type: ADD_TODO });
export const EDITTODO = () => ({ type: EDIT_TODO });
export const DELETETODO = () => ({ type: DELETE_TODO });
export const COMPLETETODO = () => ({ type: COMPLETE_TODO });
export const COMPLETEALL = () => ({ type: COMPLETE_ALL });
export const CLEARCOMPLETED = () => ({ type: CLEAR_COMPLETED });

export type TodoActions = { type: string; payload: TodoModel };

/*
export type TodoActions = Omit<typeof TodoActions, 'Type'>;
export const useTodoActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = TodoActions;
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as TodoActions;
};
 */
