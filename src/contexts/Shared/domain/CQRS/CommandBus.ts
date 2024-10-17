import { Command } from './CQRS/Command';

export interface CommandBus {
  dispatch(command: Command): Promise<void>;
}
