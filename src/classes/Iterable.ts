export default class Iterable<T> {

  #entries: T[] = [];
  public length: number = 0;

  [index: number]: T;

  [Symbol.iterator] = function() {
    let count = 0;
    let isDone = false;

    let next = () => {
      if(count >= this.#entries.length) {
          isDone = true;
      }
      return { done: isDone, value: this.#entries[count++] };
    }

    return { next };
  }

  push(value: T): number {
    this.#entries.push(value);
    this[this.#entries.length-1] = value;
    this.length = this.#entries.length;
    return this.#entries.length;
  }

  splice(start: number = 0, deleteCount: number = 0, items: T[] = []) {
    return this.#entries.splice(start, deleteCount, ...items);
  }
}