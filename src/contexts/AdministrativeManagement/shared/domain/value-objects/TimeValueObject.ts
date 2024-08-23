//import { InvalidArgumentError } from './InvalidArgumentError';

export type Primitives = string | Date;

export abstract class TimeValueObject<T extends Primitives> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: T): void {
    if(value){
        const parsedDate = new Date(value);
        if (isNaN(parsedDate.getTime())) {
          throw new Error('Value must be a string, null or Date');
        }
    }
  }

  equals(other: TimeValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name && other.value === this.value;
  }

  toString(): string {
    if(!this.value) throw new Error('Value must be defined');
    return this.value.toString();
  }
}


