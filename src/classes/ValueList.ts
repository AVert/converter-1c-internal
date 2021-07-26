export default class ValueList extends Array{

  constructor() {
    super();
  }

  add(value: any, representation?: string, marked: boolean = false): ValueListItem {
    const item = new ValueListItem(value, representation, marked);
    this.push(item);
    return item;
  }
}

class ValueListItem {
  value: string;
  representation: string | undefined;
  marked: boolean;

  constructor(value: any, representation: string | undefined, marked: boolean) {
    this.value = value;
    this.representation = representation;
    this.marked = marked;
  }
}