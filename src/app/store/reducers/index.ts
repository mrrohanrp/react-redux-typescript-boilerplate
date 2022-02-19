import { combineReducers } from 'redux';
import { RootState } from './state';
import todoReducer from './todoReducer';

export { RootState };

export const rootReducer = combineReducers<RootState>({
  todos: todoReducer
});
