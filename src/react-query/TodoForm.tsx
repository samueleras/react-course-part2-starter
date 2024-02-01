import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "../hooks/useTodos";
import axios from "axios";

interface AddTodoContext {
  previousTodos: Todo[];
}

const TodoForm = () => {
  const queryClient = useQueryClient();

  //useMutation<What we receive, what kind of error, what we send, the context is an object to transfer data between callbacks here its the todolist before updating the cache>
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onMutate: (newTodo: Todo) => {
      //Invalidating the Cache and therefore forcing to refetch (Doesnt work with json placeholder)
      /* queryClient.invalidateQueries({
        queryKey: ['todos']
      }); */
      //2. Approach: Updating the data in the cache
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        ...(todos || []),
        newTodo,
      ]);
      if (ref.current) ref.current.value = "";
      return { previousTodos };
    },
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },
    onError: (error, newTodo, context) => {
      if (ref.current) ref.current.value = newTodo.title;
      if (!context) return;
      queryClient.setQueryData<Todo[]>(["todos"], () => context.previousTodos);
    },
  });
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current && ref.current.value) {
            addTodo.mutate({
              id: 0,
              title: ref.current.value,
              completed: false,
              userId: 1,
            });
          }
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
      {addTodo.isError && (
        <div className="alert alert-danger">
          Error on adding Todo: {addTodo.error.message}
        </div>
      )}
    </>
  );
};

export default TodoForm;
