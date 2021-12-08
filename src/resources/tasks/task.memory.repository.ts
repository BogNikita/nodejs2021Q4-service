import { Task, ITask } from './task.model';

let db: ITask[] = [];

const getAll = (boardId: string) =>
  db.filter((task) => task.boardId === boardId);

const getTask = (id: string) => db.find((task) => task.id === id);

const createTask = ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: ITask) => {
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  db.push(newTask);
  return newTask;
};

const updateTask = (id: string, data: ITask) => {
  const findTaskIndex = db.findIndex((task) => task.id === id);
  db[findTaskIndex] = { ...db[findTaskIndex], ...data };
  return db[findTaskIndex];
};

const deleteTask = (id: string) => {
  const findTaskIndex = db.findIndex((task) => task.id === id);
  if (findTaskIndex === -1) {
    return false;
  }
  db.splice(findTaskIndex, 1);
  return true;
};

const clearUserIdTask = (id: string): void => {
  db = db.map((task) => {
    if (task.userId === id) {
      return { ...task, userId: null };
    }
    return task;
  });
};

const clearBoardTasks = (id: string): void => {
  db = db.filter((task) => task.boardId !== id);
};

export default {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  clearUserIdTask,
  clearBoardTasks,
};
