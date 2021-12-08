import { ITask } from "./task.model";

import tasksRepo from './task.memory.repository';

const getAll = (boardId: string) => tasksRepo.getAll(boardId);

const getTask = (id: string) => tasksRepo.getTask(id);

const createTask = (task: ITask) => tasksRepo.createTask(task);

const updateTask = (id: string, body: ITask) => tasksRepo.updateTask(id, body);

const deleteTask = (id: string) => tasksRepo.deleteTask(id);

export default  { getAll, getTask, createTask, updateTask, deleteTask };
