package com.example.backend.service;

import java.util.LinkedList;
import java.util.Queue;

import com.example.backend.model.Node;
import com.example.backend.model.SearchResult;

public class QueueService {
    private Queue<Node> queue = new LinkedList<>();
    private int id = 0;

    public void enqueue(String value) {
        Node newNode = new Node(id++, value, -1);

        if (queue.isEmpty()) {
            queue.add(newNode);
        } else {
            Node previousNode = get(queue, queue.size() - 1);
            previousNode.setNextId(queue.size());
            queue.add(newNode);
        }
    }

    public SearchResult search(String value) {
        if (queue.isEmpty())
            return null;

        for (int i = 0; i < queue.size(); i++) {
            Node node = get(queue, i);

            if (node.getValue().equals(value)) {
                return new SearchResult(node.getValue(), i);
            }
        }

        return null;
    }

    public String dequeue() {
        if (queue.isEmpty())
            return null;

        return queue.remove().getValue();
    }

    public String peek() {
        if (queue.isEmpty())
            return null;
        return queue.peek().getValue();
    }

    public boolean clear() {
        if (queue.isEmpty())
            return false;
        id = 0;
        queue.clear();
        return true;
    }

    private Node get(Queue<Node> queue, int index) {
        if (queue.isEmpty())
            return null;

        Node[] array = getQueue();
        return array[index];
    }

    public Node[] getQueue() {
        return queue.toArray(new Node[0]);
    }
}
