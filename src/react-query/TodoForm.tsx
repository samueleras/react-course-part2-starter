import { useRef } from "react";
import useAddTodo from "../hooks/useAddTodo";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const addTodo = useAddTodo(
    () => {
      if (ref.current) ref.current.value = "";
    },
    (newTodo) => {
      if (ref.current) ref.current.value = newTodo.title;
    }
  );

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
