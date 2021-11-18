class Queue {
  constructor() {
    this.first = undefined;
    this.last = undefined;
    this.onPush = undefined;
  }

  push(item) {
    const node = { item: item };

    if (this.last !== undefined) {
      this.last = this.last.next = node;
    } else {
      this.last = this.first = node;
    }

    if (this.onPush) {
      this.onPush(this.pop());
      this.onPush = undefined;
    }
  }

  pop() {
    const node = this.first;

    if (node !== undefined) {
      this.first = node.next;

      if (this.first === undefined) {
        this.last = undefined;
      }

      return node.item;
    } else {
      const thiz = this;

      return new Promise(resolve => {
        thiz.onPush = resolve;
      });
    }
  }
}

export { Queue };
