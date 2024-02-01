import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "../hooks/useTodos";
import axios from "axios";

const TodoForm = () => {
  const queryClient = useQueryClient();

  //useMutation<What we receive, what kind of error, what we send>  But the annotation isnt even need here.
  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onSuccess: (savedTodo, newTodo) => {
      //Invalidating the Cache and therefore forcing to refetch (Doesnt work with json placeholder)
      /* queryClient.invalidateQueries({
        queryKey: ['todos']
      }); */
      //2. Approach: Updating the data in the cache
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        ...(todos || []),
        savedTodo,
      ]);
      if (ref.current) ref.current.value = "";
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
          <button className="btn btn-primary" disabled={addTodo.isPending}>
            {addTodo.isPending ? "Adding..." : "Add"}
          </button>
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
