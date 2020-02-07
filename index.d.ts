import { Chalk } from 'chalk';

interface LoggerOptions {
  withTimestamp?: boolean;
  withLabel?: boolean;
  timestampFormat?: string;
  highlightStackTrace?: boolean;
}

declare class Logger {
  constructor(options: LoggerOptions);
  withTimestamp: boolean;
  withLabel: boolean;
  timestampFormat: string;
  chalk: Chalk;
  Logger: typeof Logger;
  log(message?: any, ...optionalParams: any[]): void;
  echo(message?: any, ...optionalParams: any[]): void;
  println(message?: any, ...optionalParams: any[]): void;
  trace(message?: any, ...optionalParams: any[]): void;
  debug(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
  fatal(message?: any, ...optionalParams: any[]): void;
}

declare const defaultInstance: Logger;

export = defaultInstance;
