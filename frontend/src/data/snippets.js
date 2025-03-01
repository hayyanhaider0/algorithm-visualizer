export const snippets = {
  linkedList: [
    {
      language: "Javascript",
      code: `class Node {
    constructor(data) {
      this.data = data
      this.prev = null
      this.next = null
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null
      this.tail = null
    }
  
    isEmpty() {
      return this.head === null
    }
  
    insert(data) {
      const newNode = new Node(data)
  
      if (this.isEmpty()) {
        this.head = this.tail = newNode
        return
      }
  
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }
  
    search(data) {
      let current = this.head
  
      while (current) {
        if (current.data === data) return true
        current = current.next
      }
  
      return false
    }
  
    delete(data) {
      let current = this.head
  
      while (current) {
        if (current.data === data) {
          if (!current.prev) {
            this.head = current.next
            if (this.head) this.head.prev = null
          } else if (!current.next) {
            this.tail = current.prev
            if (this.tail) this.tail.next = null
          } else {
            current.prev.next = current.next
            current.next.prev = current.prev
          }
          return
        }
        current = current.next
      }
    }
  
    clear() {
      this.head = this.tail = null
    }
  }`,
    },
    {
      language: "Java",
      code: `public class LinkedList<T> {
    private class Node {
      private T data;
      private Node prev;
      private Node next;
  
      public Node(T data) {
        this.data = data;
        this.prev = null;
        this.next = null;
      }
    }
  
    private Node head;
    private Node tail;
  
    private boolean isEmpty() {
      return head == null;
    }
  
    public void insert(T data) {
      Node newNode = new Node(data);
  
      if (isEmpty()) {
        head = tail = newNode;
        return;
      }
  
      tail.next = newNode;
      newNode.prev = tail;
      tail = newNode;
    }
  
    public boolean search(T data) {
      Node current = head;
  
      while (current != null) {
        if (current.data.equals(data)) return true;
        current = current.next;
      }
  
      return false;
    }
  
    public void delete(T data) {
      Node current = head;
  
      while (current != null) {
        if (current.data.equals(data)) {
          if (current.prev == null) {
            head = current.next;
            if (head != null) head.prev = null;
          } else if (current.next == null) {
            tail = current.prev;
            if (tail != null) tail.next = null;
          } else {
            current.prev.next = current.next;
            current.next.prev = current.prev;
          }
          return;
        }
        current = current.next;
      }
    }
  
    public void clear() {
      head = tail = null;
    }
  }`,
    },
    {
      language: "C",
      code: `typedef struct Node {
    void* data;
    struct Node* prev;
    struct Node* next;
  } Node;
  
  typedef struct LinkedList {
    Node* head;
    Node* tail;
  } LinkedList;
  
  LinkedList* createList() {
    LinkedList* list = malloc(sizeof(LinkedList));
    list->head = list->tail = NULL;
    return list;
  }
  
  Node* createNode(void* data) {
    Node* node = malloc(sizeof(Node));
    node->data = data;
    node->prev = node->next = NULL;
    return node;
  }
  
  bool isEmpty(LinkedList* list) {
    return list->head == NULL;
  }
  
  void insert(LinkedList* list, void* data) {
    Node* newNode = createNode(data);
  
    if (isEmpty(list)) {
      list->head = list->tail = newNode;
      return;
    }
  
    list->tail->next = newNode;
    newNode->prev = list->tail;
    list->tail = newNode;
  }
  
  bool search(LinkedList* list, void* data, int (*cmp)(void*, void*)) {
    Node* current = list->head;
  
    while (current) {
      if (cmp(current->data, data) == 0) return true;
      current = current->next;
    }
  
    return false;
  }
  
  void deleteNode(LinkedList* list, void* data, int (*cmp)(void*, void*)) {
    Node* current = list->head;
  
    while (current) {
      if (cmp(current->data, data) == 0) {
        if (!current->prev) {
          list->head = current->next;
          if (list->head) list->head->prev = NULL;
        } else if (!current->next) {
          list->tail = current->prev;
          if (list->tail) list->tail->next = NULL;
        } else {
          current->prev->next = current->next;
          current->next->prev = current->prev;
        }
        free(current);
        return;
      }
      current = current->next;
    }
  }
  
  void clearList(LinkedList* list) {
    Node* current = list->head;
    while (current) {
      Node* next = current->next;
      free(current);
      current = next;
    }
    list->head = list->tail = NULL;
  }
  
  void freeList(LinkedList* list) {
    clearList(list);
    free(list);
  }`,
    },
    {
      language: "Python",
      code: `class Node:
    def __init__(self, data):
      self.data = data
      self.prev = None
      self.next = None
  
  class LinkedList:
    def __init__(self):
      self.head = None
      self.tail = None
  
    def is_empty(self):
      return self.head is None
  
    def insert(self, data):
      new_node = Node(data)
  
      if self.is_empty():
        self.head = self.tail = new_node
        return
  
      self.tail.next = new_node
      new_node.prev = self.tail
      self.tail = new_node
  
    def search(self, data):
      current = self.head
      while current:
        if current.data == data:
          return True
        current = current.next
      return False
  
    def delete(self, data):
      current = self.head
      while current:
        if current.data == data:
          if not current.prev:
            self.head = current.next
            if self.head:
              self.head.prev = None
          elif not current.next:
            self.tail = current.prev
            if self.tail:
              self.tail.next = None
          else:
            current.prev.next = current.next
            current.next.prev = current.prev
          return
        current = current.next
  
    def clear(self):
      self.head = self.tail = None`,
    },
  ],
  stack: [
    {
      language: "Javascript",
      code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(data) {
    const newNode = new Node(data);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
  }

  pop() {
    if (this.isEmpty()) return null;
    const poppedNode = this.top;
    this.top = this.top.next;
    this.size--;
    return poppedNode.data;
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.top.data;
  }

  isEmpty() {
    return this.top === null;
  }

  clear() {
    this.top = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }
}`,
    },
    {
      language: "Java",
      code: `public class Stack<T> {
  private class Node {
    T data;
    Node next;

    public Node(T data) {
      this.data = data;
      this.next = null;
    }
  }

  private Node top;
  private int size;

  public Stack() {
    this.top = null;
    this.size = 0;
  }

  public void push(T data) {
    Node newNode = new Node(data);
    newNode.next = top;
    top = newNode;
    size++;
  }

  public T pop() {
    if (isEmpty()) return null;
    T data = top.data;
    top = top.next;
    size--;
    return data;
  }

  public T peek() {
    if (isEmpty()) return null;
    return top.data;
  }

  public boolean isEmpty() {
    return size == 0;
  }

  public int size() {
    return size;
  }

  public void clear() {
    top = null;
    size = 0;
  }
}`,
    },
    {
      language: "C",
      code: `typedef struct Node {
  void* data;
  struct Node* next;
} Node;

typedef struct Stack {
  Node* top;
  int size;
} Stack;

Stack* createStack() {
  Stack* stack = malloc(sizeof(Stack));
  stack->top = NULL;
  stack->size = 0;
  return stack;
}

void push(Stack* stack, void* data) {
  Node* newNode = malloc(sizeof(Node));
  newNode->data = data;
  newNode->next = stack->top;
  stack->top = newNode;
  stack->size++;
}

void* pop(Stack* stack) {
  if (stack->top == NULL) return NULL;
  Node* temp = stack->top;
  void* data = temp->data;
  stack->top = stack->top->next;
  free(temp);
  stack->size--;
  return data;
}

void* peek(Stack* stack) {
  if (stack->top == NULL) return NULL;
  return stack->top->data;
}

int isEmpty(Stack* stack) {
  return stack->size == 0;
}

int size(Stack* stack) {
  return stack->size;
}

void clear(Stack* stack) {
  Node* current = stack->top;
  while (current != NULL) {
    Node* next = current->next;
    free(current);
    current = next;
  }
  stack->top = NULL;
  stack->size = 0;
}

void freeStack(Stack* stack) {
  clear(stack);
  free(stack);
}`,
    },
    {
      language: "Python",
      code: `class Node:
  def __init__(self, data):
    self.data = data
    self.next = None

class Stack:
  def __init__(self):
    self.top = None
    self.size = 0

  def push(self, data):
    new_node = Node(data)
    new_node.next = self.top
    self.top = new_node
    self.size += 1

  def pop(self):
    if self.is_empty():
      return None
    popped_node = self.top
    self.top = self.top.next
    self.size -= 1
    return popped_node.data

  def peek(self):
    if self.is_empty():
      return None
    return self.top.data

  def is_empty(self):
    return self.top is None

  def size(self):
    return self.size

  def clear(self):
    self.top = None
    self.size = 0`,
    },
  ],
  queue: [
    {
      language: "Javascript",
      code: `class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  class Queue {
    constructor() {
      this.front = null;
      this.rear = null;
      this.size = 0;
    }
  
    enqueue(data) {
      const newNode = new Node(data);
      if (this.isEmpty()) {
        this.front = this.rear = newNode;
      } else {
        this.rear.next = newNode;
        this.rear = newNode;
      }
      this.size++;
    }
  
    dequeue() {
      if (this.isEmpty()) return null;
      const dequeuedNode = this.front;
      this.front = this.front.next;
      this.size--;
      return dequeuedNode.data;
    }
  
    peek() {
      if (this.isEmpty()) return null;
      return this.front.data;
    }
  
    isEmpty() {
      return this.size === 0;
    }
  
    clear() {
      this.front = this.rear = null;
      this.size = 0;
    }
  
    getSize() {
      return this.size;
    }
  }`,
    },
    {
      language: "Java",
      code: `public class Queue<T> {
    private class Node {
      T data;
      Node next;
  
      public Node(T data) {
        this.data = data;
        this.next = null;
      }
    }
  
    private Node front;
    private Node rear;
    private int size;
  
    public Queue() {
      this.front = null;
      this.rear = null;
      this.size = 0;
    }
  
    public void enqueue(T data) {
      Node newNode = new Node(data);
      if (isEmpty()) {
        front = rear = newNode;
      } else {
        rear.next = newNode;
        rear = newNode;
      }
      size++;
    }
  
    public T dequeue() {
      if (isEmpty()) return null;
      T data = front.data;
      front = front.next;
      size--;
      return data;
    }
  
    public T peek() {
      if (isEmpty()) return null;
      return front.data;
    }
  
    public boolean isEmpty() {
      return size == 0;
    }
  
    public int size() {
      return size;
    }
  
    public void clear() {
      front = rear = null;
      size = 0;
    }
  }`,
    },
    {
      language: "C",
      code: `typedef struct Node {
    void* data;
    struct Node* next;
  } Node;
  
  typedef struct Queue {
    Node* front;
    Node* rear;
    int size;
  } Queue;
  
  Queue* createQueue() {
    Queue* queue = malloc(sizeof(Queue));
    queue->front = queue->rear = NULL;
    queue->size = 0;
    return queue;
  }
  
  void enqueue(Queue* queue, void* data) {
    Node* newNode = malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;
    if (queue->rear == NULL) {
      queue->front = queue->rear = newNode;
    } else {
      queue->rear->next = newNode;
      queue->rear = newNode;
    }
    queue->size++;
  }
  
  void* dequeue(Queue* queue) {
    if (queue->front == NULL) return NULL;
    Node* temp = queue->front;
    void* data = temp->data;
    queue->front = queue->front->next;
    if (queue->front == NULL) {
      queue->rear = NULL;
    }
    free(temp);
    queue->size--;
    return data;
  }
  
  void* peek(Queue* queue) {
    if (queue->front == NULL) return NULL;
    return queue->front->data;
  }
  
  int isEmpty(Queue* queue) {
    return queue->size == 0;
  }
  
  int size(Queue* queue) {
    return queue->size;
  }
  
  void clear(Queue* queue) {
    Node* current = queue->front;
    while (current != NULL) {
      Node* next = current->next;
      free(current);
      current = next;
    }
    queue->front = queue->rear = NULL;
    queue->size = 0;
  }
  
  void freeQueue(Queue* queue) {
    clear(queue);
    free(queue);
  }`,
    },
    {
      language: "Python",
      code: `class Node:
    def __init__(self, data):
      self.data = data
      self.next = None
  
  class Queue:
    def __init__(self):
      self.front = None
      self.rear = None
      self.size = 0
  
    def enqueue(self, data):
      new_node = Node(data)
      if self.is_empty():
        self.front = self.rear = new_node
      else:
        self.rear.next = new_node
        self.rear = new_node
      self.size += 1
  
    def dequeue(self):
      if self.is_empty():
        return None
      dequeued_node = self.front
      self.front = self.front.next
      self.size -= 1
      return dequeued_node.data
  
    def peek(self):
      if self.is_empty():
        return None
      return self.front.data
  
    def is_empty(self):
      return self.front is None
  
    def size(self):
      return self.size
  
    def clear(self):
      self.front = self.rear = None
      self.size = 0`,
    },
  ],
  bst: [
    {
      language: "Javascript",
      code: `class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }

  class BinarySearchTree {
    constructor() {
      this.root = null;
    }

    insert(data) {
      const newNode = new Node(data);
      if (this.root === null) {
        this.root = newNode;
      } else {
        this.insertNode(this.root, newNode);
      }
    }

    insertNode(node, newNode) {
      if (newNode.data < node.data) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          this.insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          this.insertNode(node.right, newNode);
        }
      }
    }

    search(data) {
      return this.searchNode(this.root, data);
    }

    searchNode(node, data) {
      if (node === null) {
        return null;
      }
      if (data < node.data) {
        return this.searchNode(node.left, data);
      } else if (data > node.data) {
        return this.searchNode(node.right, data);
      } else {
        return node;
      }
    }

    inOrder() {
      const result = [];
      this.inOrderTraversal(this.root, result);
      return result;
    }

    inOrderTraversal(node, result) {
      if (node !== null) {
        this.inOrderTraversal(node.left, result);
        result.push(node.data);
        this.inOrderTraversal(node.right, result);
      }
    }

    isEmpty() {
      return this.root === null;
    }
  }`,
    },
    {
      language: "Java",
      code: `public class BinarySearchTree {
    private class Node {
      int data;
      Node left;
      Node right;

      public Node(int data) {
        this.data = data;
        this.left = null;
        this.right = null;
      }
    }

    private Node root;

    public BinarySearchTree() {
      root = null;
    }

    public void insert(int data) {
      Node newNode = new Node(data);
      if (root == null) {
        root = newNode;
      } else {
        insertNode(root, newNode);
      }
    }

    private void insertNode(Node node, Node newNode) {
      if (newNode.data < node.data) {
        if (node.left == null) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else {
        if (node.right == null) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
    }

    public Node search(int data) {
      return searchNode(root, data);
    }

    private Node searchNode(Node node, int data) {
      if (node == null) {
        return null;
      }
      if (data < node.data) {
        return searchNode(node.left, data);
      } else if (data > node.data) {
        return searchNode(node.right, data);
      } else {
        return node;
      }
    }

    public boolean isEmpty() {
      return root == null;
    }

    public List<Integer> inOrder() {
      List<Integer> result = new ArrayList<>();
      inOrderTraversal(root, result);
      return result;
    }

    private void inOrderTraversal(Node node, List<Integer> result) {
      if (node != null) {
        inOrderTraversal(node.left, result);
        result.add(node.data);
        inOrderTraversal(node.right, result);
      }
    }
  }`,
    },
    {
      language: "C",
      code: `typedef struct Node {
    int data;
    struct Node* left;
    struct Node* right;
} Node;

typedef struct BinarySearchTree {
    Node* root;
} BinarySearchTree;

BinarySearchTree* createBST() {
    BinarySearchTree* bst = malloc(sizeof(BinarySearchTree));
    bst->root = NULL;
    return bst;
}

Node* createNode(int data) {
    Node* node = malloc(sizeof(Node));
    node->data = data;
    node->left = node->right = NULL;
    return node;
}

void insert(BinarySearchTree* bst, int data) {
    Node* newNode = createNode(data);
    if (bst->root == NULL) {
        bst->root = newNode;
    } else {
        insertNode(bst->root, newNode);
    }
}

void insertNode(Node* node, Node* newNode) {
    if (newNode->data < node->data) {
        if (node->left == NULL) {
            node->left = newNode;
        } else {
            insertNode(node->left, newNode);
        }
    } else {
        if (node->right == NULL) {
            node->right = newNode;
        } else {
            insertNode(node->right, newNode);
        }
    }
}

Node* search(BinarySearchTree* bst, int data) {
    return searchNode(bst->root, data);
}

Node* searchNode(Node* node, int data) {
    if (node == NULL) return NULL;
    if (data < node->data) {
        return searchNode(node->left, data);
    } else if (data > node->data) {
        return searchNode(node->right, data);
    } else {
        return node;
    }
}

int isEmpty(BinarySearchTree* bst) {
    return bst->root == NULL;
}

void inOrderTraversal(Node* node) {
    if (node != NULL) {
        inOrderTraversal(node->left);
        printf("%d ", node->data);
        inOrderTraversal(node->right);
    }
}

void inOrder(BinarySearchTree* bst) {
    inOrderTraversal(bst->root);
}
`,
    },
    {
      language: "Python",
      code: `class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, data):
        new_node = Node(data)
        if self.root is None:
            self.root = new_node
        else:
            self._insert_node(self.root, new_node)

    def _insert_node(self, node, new_node):
        if new_node.data < node.data:
            if node.left is None:
                node.left = new_node
            else:
                self._insert_node(node.left, new_node)
        else:
            if node.right is None:
                node.right = new_node
            else:
                self._insert_node(node.right, new_node)

    def search(self, data):
        return self._search_node(self.root, data)

    def _search_node(self, node, data):
        if node is None:
            return None
        if data < node.data:
            return self._search_node(node.left, data)
        elif data > node.data:
            return self._search_node(node.right, data)
        else:
            return node

    def is_empty(self):
        return self.root is None

    def in_order(self):
        result = []
        self._in_order_traversal(self.root, result)
        return result

    def _in_order_traversal(self, node, result):
        if node is not None:
            self._in_order_traversal(node.left, result)
            result.append(node.data)
            self._in_order_traversal(node.right, result)
`,
    },
  ],
  heap: [
    {
      language: "JavaScript",
      code: `class BinaryHeap {
    constructor(isMinHeap = true) {
        this.heap = [];
        // Flag that determines if the heap is a Min Heap (true) or Max Heap (false)
        this.isMinHeap = isMinHeap;
    }

    extreme(child, parent) {
        return this.isMinHeap ? child < parent : child > parent;
    }

    getRoot() {
        return this.heap[0];
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.extreme(this.heap[index], this.heap[parentIndex])) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    extractRoot() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return root;
    }

    heapifyDown(index) {
        let leftChildIndex = 2 * index + 1;
        let rightChildIndex = 2 * index + 2;
        let extremeIndex = index;

        if (leftChildIndex < this.heap.length && this.extreme(this.heap[leftChildIndex], this.heap[extremeIndex])) {
            extremeIndex = leftChildIndex;
        }
        if (rightChildIndex < this.heap.length && this.extreme(this.heap[rightChildIndex], this.heap[extremeIndex])) {
            extremeIndex = rightChildIndex;
        }
        if (extremeIndex !== index) {
            [this.heap[index], this.heap[extremeIndex]] = [this.heap[extremeIndex], this.heap[index]];
            this.heapifyDown(extremeIndex);
        }
    }
  }`,
    },
    {
      language: "Java",
      code: `public class BinaryHeap {
    private boolean isMinHeap;
    private List<Integer> heap;

    public BinaryHeap(boolean isMinHeap) {
        this.isMinHeap = isMinHeap;
        // Flag that determines if the heap is a Min Heap (true) or Max Heap (false)
        this.heap = new ArrayList<>();
    }

    private boolean extreme(int child, int parent) {
        return isMinHeap ? child < parent : child > parent;
    }

    public void insert(int value) {
        heap.add(value);
        heapifyUp();
    }

    private void heapifyUp() {
        int index = heap.size() - 1;
        while (index > 0) {
            int parentIndex = (index - 1) / 2;
            if (extreme(heap.get(index), heap.get(parentIndex))) {
                Collections.swap(heap, index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    public int extractRoot() {
        if (heap.isEmpty()) return -1; // Or some error value
        if (heap.size() == 1) return heap.remove(0);
        int root = heap.get(0);
        heap.set(0, heap.remove(heap.size() - 1));
        heapifyDown(0);
        return root;
    }

    private void heapifyDown(int index) {
        int leftChildIndex = 2 * index + 1;
        int rightChildIndex = 2 * index + 2;
        int extremeIndex = index;

        if (leftChildIndex < heap.size() && extreme(heap.get(leftChildIndex), heap.get(extremeIndex))) {
            extremeIndex = leftChildIndex;
        }
        if (rightChildIndex < heap.size() && extreme(heap.get(rightChildIndex), heap.get(extremeIndex))) {
            extremeIndex = rightChildIndex;
        }
        if (extremeIndex != index) {
            Collections.swap(heap, index, extremeIndex);
            heapifyDown(extremeIndex);
        }
    }

    public boolean isEmpty() {
        return heap.isEmpty();
    }
  }`,
    },
    {
      language: "C",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct BinaryHeap {
    int* heap;
    int size;
    int capacity;
    int isMinHeap;
} BinaryHeap;

BinaryHeap* createHeap(int isMinHeap) {
    BinaryHeap* heap = malloc(sizeof(BinaryHeap));
    heap->heap = malloc(10 * sizeof(int)); // Initial capacity of 10
    heap->size = 0;
    heap->capacity = 10;
    // Flag that determines if the heap is a Min Heap (True) or Max Heap (False)
    heap->isMinHeap = isMinHeap;
    return heap;
}

int extreme(int child, int parent, int isMinHeap) {
    return isMinHeap ? child < parent : child > parent;
}

void insert(BinaryHeap* heap, int value) {
    if (heap->size >= heap->capacity) {
        heap->capacity *= 2;
        heap->heap = realloc(heap->heap, heap->capacity * sizeof(int));
    }
    heap->heap[heap->size] = value;
    heap->size++;
    heapifyUp(heap);
}

void heapifyUp(BinaryHeap* heap) {
    int index = heap->size - 1;
    while (index > 0) {
        int parentIndex = (index - 1) / 2;
        if (extreme(heap->heap[index], heap->heap[parentIndex], heap->isMinHeap)) {
            int temp = heap->heap[index];
            heap->heap[index] = heap->heap[parentIndex];
            heap->heap[parentIndex] = temp;
            index = parentIndex;
        } else {
            break;
        }
    }
}

int extractRoot(BinaryHeap* heap) {
    if (heap->size == 0) return -1; // Error
    if (heap->size == 1) {
        heap->size--;
        return heap->heap[0];
    }
    int root = heap->heap[0];
    heap->heap[0] = heap->heap[heap->size - 1];
    heap->size--;
    heapifyDown(heap, 0);
    return root;
}

void heapifyDown(BinaryHeap* heap, int index) {
    int leftChildIndex = 2 * index + 1;
    int rightChildIndex = 2 * index + 2;
    int extremeIndex = index;

    if (leftChildIndex < heap->size && extreme(heap->heap[leftChildIndex], heap->heap[extremeIndex], heap->isMinHeap)) {
        extremeIndex = leftChildIndex;
    }
    if (rightChildIndex < heap->size && extreme(heap->heap[rightChildIndex], heap->heap[extremeIndex], heap->isMinHeap)) {
        extremeIndex = rightChildIndex;
    }
    if (extremeIndex != index) {
        int temp = heap->heap[index];
        heap->heap[index] = heap->heap[extremeIndex];
        heap->heap[extremeIndex] = temp;
        heapifyDown(heap, extremeIndex);
    }
}

int isEmpty(BinaryHeap* heap) {
    return heap->size == 0;
}
`,
    },
    {
      language: "Python",
      code: `class BinaryHeap:
    def __init__(self, is_min_heap=True):
    self.heap = []
        # Flag that determines if the heap is a Min Heap (True) or Max Heap (False)
        self.is_min_heap = is_min_heap

    def extreme(self, child, parent):
        return child < parent if self.is_min_heap else child > parent

    def insert(self, value):
        self.heap.append(value)
        self.heapify_up()

    def heapify_up(self):
        index = len(self.heap) - 1
        while index > 0:
            parent_index = (index - 1) // 2
            if self.extreme(self.heap[index], self.heap[parent_index]):
                self.heap[index], self.heap[parent_index] = self.heap[parent_index], self.heap[index]
                index = parent_index
            else:
                break

    def extract_root(self):
        if len(self.heap) == 0:
            return None
        if len(self.heap) == 1:
            return self.heap.pop()
        root = self.heap[0]
        self.heap[0] = self.heap.pop()
        self.heapify_down(0)
        return root

    def heapify_down(self, index):
        left_child_index = 2 * index + 1
        right_child_index = 2 * index + 2
        extreme_index = index

        if left_child_index < len(self.heap) and self.extreme(self.heap[left_child_index], self.heap[extreme_index]):
            extreme_index = left_child_index
        if right_child_index < len(self.heap) and self.extreme(self.heap[right_child_index], self.heap[extreme_index]):
            extreme_index = right_child_index
        if extreme_index != index:
            self.heap[index], self.heap[extreme_index] = self.heap[extreme_index], self.heap[index]
            self.heapify_down(extreme_index)

    def is_empty(self):
        return len(self.heap) == 0
`,
    },
  ],
};
