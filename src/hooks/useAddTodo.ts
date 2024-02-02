import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../react-query/constants";
import todoService, { Todo } from "../services/todoService";

interface AddTodoContext {
  previousTodos: Todo[];
}

//Übergebene Callsbacks sind optional
const useAddTodo = (onAdd?: () => void, onErr?: (newTodo: Todo) => void) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoService.post,
    onMutate: (newTodo: Todo) => {
      const previousTodos =
        queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
        ...todos,
        newTodo,
      ]);
      onAdd && onAdd();
      return { previousTodos };
    },
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },
    onError: (error, newTodo, context) => {
      onErr && onErr(newTodo);
      if (!context) return;
      queryClient.setQueryData<Todo[]>(
        CACHE_KEY_TODOS,
        () => context.previousTodos
      );
    },
  });
};

export default useAddTodo;
