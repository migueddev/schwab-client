import { LogLevel } from '../types';

export class Logger {
  private verbose: boolean;

  constructor(verbose: boolean = false) {
    this.verbose = verbose;
  }

  public log(type: LogLevel, message: string): void {
    if (!this.verbose) return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [Schwab] [${type.toUpperCase()}]`;

    const loggers: Record<LogLevel, (msg: string) => void> = {
      info: console.log,
      warn: console.warn,
      error: console.error,
    };

    loggers[type](`${prefix} ${message}`);
  }

  public info(message: string): void {
    this.log(LogLevel.Info, message);
  }

  public warn(message: string): void {
    this.log(LogLevel.Warn, message);
  }

  public error(message: string): void {
    this.log(LogLevel.Error, message);
  }
}
