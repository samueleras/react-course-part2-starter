export interface Task {
  id: number;
  title: string;
}

interface AddTask {
  type: "ADD";
  task: Task;
}

interface DeleteTask {
  type: "DELETE";
  taskId: number;
}

export type TaskAction = AddTask | DeleteTask;

const tasksReducer = (tasks: Task[], action: TaskAction): Task[] => {
  if (action.type === "ADD") return [action.task, ...tasks];
  if (action.type === "DELETE")
    return tasks.filter((t) => t.id !== action.taskId);
  return [];
};

export default tasksReducer;
