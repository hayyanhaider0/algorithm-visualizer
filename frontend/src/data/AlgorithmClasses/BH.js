class BH {
  constructor(isMinHeap) {
    this.arr = [];
    this.uniqueId = 1;
    this.isMinHeap = isMinHeap;
  }

  insert(data) {
    const node = {
      id: this.uniqueId++,
      value: data,
      children: [null, null],
      position: null,
    };

    this.arr.push(node);
    this.bubbleUp(this.arr.length - 1);
  }

  bubbleUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);
    if (
      parentIndex >= 0 &&
      this.compare(this.arr[index].value, this.arr[parentIndex].value)
    ) {
      [this.arr[index], this.arr[parentIndex]] = [
        this.arr[parentIndex],
        this.arr[index],
      ];
      this.bubbleUp(parentIndex); // Recursively bubble up.
    }
  }

  search(data) {
    if (this.arr.length === 0) {
      return null;
    }

    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].value === data) {
        return this.arr[i];
      }
    }
    return null;
  }

  getRoot() {
    return this.arr[0];
  }

  extractRoot() {
    if (this.arr.length === 0) {
      return null;
    }

    const root = this.arr[0];
    this.arr[0] = this.arr[this.arr.length - 1];
    this.arr.pop();

    this.heapify(0);
    return root;
  }

  heapify(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let extreme = index;

    if (
      leftChildIndex < this.arr.length &&
      this.compare(this.arr[leftChildIndex].value, this.arr[extreme].value)
    ) {
      extreme = leftChildIndex;
    }

    if (
      rightChildIndex < this.arr.length &&
      this.compare(this.arr[rightChildIndex].value, this.arr[extreme].value)
    ) {
      extreme = rightChildIndex;
    }

    if (extreme !== index) {
      [this.arr[index], this.arr[extreme]] = [
        this.arr[extreme],
        this.arr[index],
      ];
      this.heapify(extreme);
    }
  }

  compare(a, b) {
    return this.isMinHeap ? a < b : a > b;
  }

  toTree() {
    if (this.arr.length === 0) {
      return null;
    }

    const buildTree = (index) => {
      if (index >= this.arr.length) {
        return null;
      }

      const node = this.arr[index];
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;

      node.children[0] = buildTree(leftChildIndex);
      node.children[1] = buildTree(rightChildIndex);

      return node;
    };

    return buildTree(0);
  }

  clear() {
    this.arr = [];
  }
}

export default BH;
