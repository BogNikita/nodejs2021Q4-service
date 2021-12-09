import { Task, ITask } from './task.model';

let db: ITask[] = [];
/**
 * Return all tasks by board id
 * @param boardId search string
 * @returns array tasks
 */
const getAll = (boardId: string) =>
  db.filter((task) => task.boardId === boardId);

/**
 * Return task by id
 * @param id search string
 * @returns find task
 */
const getTask = (id: string) => db.find((task) => task.id === id);

/**
 * Return new task
 * @param task object consist field title: string;
  order: string;
  description: string;
  boardId: string;
  columnId: string;
  id?: string;
  userId?: null | string;
 * @returns new task
 */
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

/**
 * Return update task by id
 * @param id search string
 * @param task object consist field title: string;
  order: string;
  description: string;
  boardId: string;
  columnId: string;
  userId?: null | string;
 * @returns updated task
 */
const updateTask = (id: string, data: ITask) => {
  const findTaskIndex = db.findIndex((task) => task.id === id);
  db[findTaskIndex] = { ...db[findTaskIndex], ...data };
  return db[findTaskIndex];
};

/**
 * Delete task by id
 * @param id search string
 * @returns boolean value
 */
const deleteTask = (id: string) => {
  const findTaskIndex = db.findIndex((task) => task.id === id);
  if (findTaskIndex === -1) {
    return false;
  }
  db.splice(findTaskIndex, 1);
  return true;
};

/**
 * Set userId null, if user was removed.
 * @param id search string
 * @returns boolean value
 */
const clearUserIdTask = (id: string): void => {
  db = db.map((task) => {
    if (task.userId === id) {
      return { ...task, userId: null };
    }
    return task;
  });
};

/**
 * Removel all task, if board was removed.
 * @param id search string
 * @returns boolean value
 */
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
