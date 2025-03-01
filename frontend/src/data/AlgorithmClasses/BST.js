class bst {
  constructor() {
    this.root = null;
    this.uniqueId = 0;
  }

  insert(data) {
    const node = {
      id: this.uniqueId,
      value: data,
      children: [null, null],
      parent: null,
      position: null,
    };

    this.uniqueId++;

    if (this.root === null) {
      this.root = node;
    } else {
      let current = this.root;
      let previous = null;

      while (current !== null) {
        if (data === current.value) {
          return;
        }

        previous = current;

        if (data > current.value) {
          current = current.children[1];
          node.position = 1;
        } else {
          current = current.children[0];
          node.position = 0;
        }
      }

      if (data > previous.value) {
        previous.children[1] = node;
        node.parent = previous;
      } else {
        previous.children[0] = node;
        node.parent = previous;
      }
    }
  }

  search(data) {
    let current = this.root;

    while (current !== null) {
      if (data === current.value) {
        return current;
      }

      if (data > current.value) {
        current = current.children[1];
      } else {
        current = current.children[0];
      }
    }

    return null;
  }

  delete(data) {
    let current = this.root;
    let parent = null;

    while (current !== null) {
      if (data === current.value) {
        if (current.children[0] !== null && current.children[1] !== null) {
          let successorParent = current;
          let successor = current.children[1];

          while (successor.children[0] !== null) {
            successorParent = successor;
            successor = successor.children[0];
          }

          current.value = successor.value;

          if (successorParent.children[0] === successor) {
            successorParent.children[0] = successor.children[1];
          } else {
            successorParent.children[1] = successor.children[1];
          }
        } else {
          const child = current.children[0] || current.children[1];

          if (parent === null) {
            this.root = child;
          } else if (parent.children[0] === current) {
            parent.children[0] = child;
          } else {
            parent.children[1] = child;
          }
        }

        return;
      }

      parent = current;

      if (data > current.value) {
        current = current.children[1];
      } else {
        current = current.children[0];
      }
    }
  }

  clear() {
    this.root = null;
  }
}

export default bst;
