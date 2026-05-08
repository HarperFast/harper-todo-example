import { tables } from 'harper';

const TodoListTable = tables.TodoList;

export class TodoListResource extends TodoListTable {

  put(target, taskItemData) {
    // Do something with the incoming content;
    return super.put(target, {
      id: taskItemData.id,
      description: taskItemData.description.trim(),
      status: taskItemData.status
    });
  }

  // we can define our own custom POST handler
  post(target, taskItemData) {
    return post(target, {
      description: taskItemData.description.trim(),
      status: taskItemData.status
    });
  }
} 
