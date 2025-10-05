import { Checkbox, Spin } from "antd";

import { taskModel } from "entities/task";
import { Todo } from "shared/api/todos/model";

// import { TaskFilter } from "features/task-filter";
// import { TaskFilter } from "../task-filter";

type Props = {
  todo: Todo;
};

export const ToggleTask = ({ todo }: Props) => {
  const {
    store: { updateTodo, isUpdateLoading },
  } = taskModel;

  return isUpdateLoading ? (
    <Spin />
  ) : (
    <Checkbox
      onChange={(val) => updateTodo({ ...todo, completed: val.target.checked })}
    />
  );
};
