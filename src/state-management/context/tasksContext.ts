import React, { Dispatch } from "react";
import { Task, TaskAction } from "../reducers/tasksReducer";

interface TasksContext {
  tasks: Task[];
  dispatch: Dispatch<TaskAction>;
}

const TasksContext = React.createContext<TasksContext>({} as TasksContext);

export default TasksContext;
