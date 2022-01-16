import { getRepository } from 'typeorm';
import { Task, ITask } from './task.model';

/**
 * Return all tasks by board id
 * @param boardId search string
 * @returns array tasks
 */
const getAll = async (boardId: string) => {
  const tasks = await getRepository(Task).find({ boardId });
  return tasks;
};

/**
 * Return task by id
 * @param id search string
 * @returns find task
 */
const getTask = async (id: string) => {
  const task = await getRepository(Task).findOne(id);
  return task;
};

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
const createTask = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: ITask) => {
  const newTask = new Task(
    title,
    order,
    description,
    boardId,
    columnId,
    userId
  );
  await getRepository(Task).save(newTask);
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
const updateTask = async (id: string, data: ITask) => {
  let task = await getRepository(Task).findOne(id);
  if (task) {
    task = { ...task, ...data };
    await getRepository(Task).save(task);
    return task;
  }
  return false;
};

/**
 * Delete task by id
 * @param id search string
 * @returns boolean value
 */
const deleteTask = async (id: string) => {
  const task = await getRepository(Task).findOne(id);
  if (task) {
    await getRepository(Task).remove(task);
    return true;
  }
  return false;
};

/**
 * Set userId null, if user was removed.
 * @param id search string
 * @returns boolean value
 */
const clearUserIdTask = async (id: string) => {
  const tasks = await getRepository(Task).find({ userId: id });
  const clearIdTasks = tasks.map((item) => ({ ...item, userId: null }));
  await getRepository(Task).save(clearIdTasks);
};

/**
 * Removel all task, if board was removed.
 * @param id search string
 * @returns boolean value
 */
const clearBoardTasks = async (id: string) => {
  const tasks = await getRepository(Task).find({ boardId: id });
  await getRepository(Task).remove(tasks);
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
