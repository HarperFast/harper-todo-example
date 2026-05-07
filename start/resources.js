// Here we can define any JavaScript-based resources and extensions to tables
// Importing the tables available to us from the harper instance
import { tables } from 'harper';

const TodoListTable = tables.TodoList;

export class TodoListResource extends TodoListTable {
  static loadAsInstance = false; // enable the updated API
  put(target, taskItemData) {
    return super.put(target, taskItemData);
  }

  post(target, taskItemData) {
    return super.post(target, taskItemData);
  }
}
