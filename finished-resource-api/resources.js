import { tables } from 'harper';

const TodoListTable = tables.TodoList;

export class TodoListResource extends TodoListTable {

  static async put(target, taskItemData) {
    // Do something with the incoming content;
    const body = await taskItemData;
    return super.put(target, {
      id: body.id,
      description: body.description?.trim() ?? '',
      status: body.status
    });
  }

  // we can define our own custom POST handler
  static async post(target, taskItemData) {
    const body = await taskItemData;
    return super.post(target, {
      description: body.description?.trim() ?? '',
      status: "active"
    });
  }
}
