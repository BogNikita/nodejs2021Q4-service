import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const writeFilePromise = promisify(fs.writeFile);

interface ILogger {
  isError: boolean;
  message: string;
  status?: number;
  params?: object;
  body?: object;
  query?: string;
  method?: string;
  url?: string;
}

export class Logger {
  method: string;

  url: string;

  body: string;

  params: string;

  status: number;

  query: string;

  message: string;

  isError: boolean;

  loggerLvl: string;

  constructor({
    method = 'none',
    url = 'none',
    body,
    query = 'none',
    params,
    status = 500,
    message,
    isError = false,
  }: ILogger) {
    this.method = method;
    this.url = url;
    this.params = this.objToString(params);
    this.body = this.objToString(body);
    this.status = status;
    this.query = query;
    this.message = message;
    this.isError = isError;
    this.loggerLvl = process.env.LOGGER_LVL || '0';
  }

  private objToString(obj?: object): string {
    if (obj && Object.keys(obj).length > 0) {
      return JSON.stringify(obj);
    }
    return '';
  }

  private createLoggerMessage(): string {
    const loggerMessage = `method: ${this.method} url: ${this.url} status: ${
      this.status
    } ${this.body && `body: ${this.body}`} ${
      this.params && `params: ${this.params}`
    } ${this.query && `query: ${this.query}`} ${
      this.message && `message: ${this.message}`
    } \n`;
    return loggerMessage;
  }

  async writeInFile() {
    const data = this.createLoggerMessage();
    console.log(data);

    if (this.isError) {
      await writeFilePromise(path.join(__dirname, '..', '..', '/logs', 'errorLogs.txt'), data, {
        flag: 'a',
        encoding: 'utf8',
      });
    } else {
      await writeFilePromise(path.join(__dirname, '..', '..', '/logs', 'logs.txt'), data, { flag: 'a', encoding: 'utf8' });
    }
  }
}
