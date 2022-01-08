import { ITask } from './task.model';
import tasksRepo from './task.memory.repository';

/**
 * Call function which return all tasks by board id
 * @param boardId search string
 * @returns array tasks
 */
const getAll = (boardId: string) => tasksRepo.getAll(boardId);

/**
 * Call function which return task by id
 * @param id search string
 * @returns find task
 */
const getTask = (id: string) => tasksRepo.getTask(id);

/**
 * Call function which return new task
 * @param task object consist field title: string;
  order: string;
  description: string;
  boardId: string;
  columnId: string;
  id?: string;
  userId?: null | string;
 * @returns new task
 */
const createTask = (task: ITask) => tasksRepo.createTask(task);

/**
 * Call function which return update task by id
 * @param id search string
 * @param task object consist field title: string;
  order: string;
  description: string;
  boardId: string;
  columnId: string;
  userId?: null | string;
 * @returns updated task
 */
const updateTask = (id: string, body: ITask) => tasksRepo.updateTask(id, body);

/**
 * Call function which delete task by id
 *  @param id search string
 * @returns boolean value
 */
const deleteTask = (id: string) => tasksRepo.deleteTask(id);

export default { getAll, getTask, createTask, updateTask, deleteTask };
