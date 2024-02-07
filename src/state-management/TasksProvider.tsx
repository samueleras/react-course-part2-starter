import { ReactNode, useReducer } from "react";
import TasksContext from "./context/tasksContext";
import tasksReducer, { Task } from "./reducers/tasksReducer";

interface Props {
  children: ReactNode;
}

const TasksProvider = ({ children }: Props) => {
  const [tasks, dispatch] = useReducer(tasksReducer, [] as Task[]);

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
