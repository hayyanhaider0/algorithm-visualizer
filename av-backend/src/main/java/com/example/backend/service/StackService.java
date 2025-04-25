package com.example.backend.service;

import java.util.Stack;

import com.example.backend.model.Node;
import com.example.backend.model.SearchResult;

public class StackService {
    private Stack<Node> stack = new Stack<>();
    private int id = 0;

    public void push(String value) {
        Node newNode = new Node(id++, value, -1);

        if (stack.isEmpty()) {
            stack.push(newNode);
        } else {
            Node previousNode = stack.get(stack.size() - 1);
            previousNode.setNextId(stack.size());
            stack.push(newNode);
        }
    }

    public SearchResult search(String value) {
        if (stack.isEmpty())
            return null;

        for (int i = 0; i < stack.size(); i++) {
            Node node = stack.get(i);

            if (node.getValue().equals(value)) {
                return new SearchResult(node.getValue(), i);
            }
        }

        return null;
    }

    public String pop() {
        if (stack.isEmpty())
            return null;

        return stack.pop().getValue();
    }

    public String peek() {
        if (stack.isEmpty())
            return null;
        return stack.peek().getValue();
    }

    public boolean clear() {
        if (stack.isEmpty())
            return false;
        id = 0;
        stack.clear();
        return true;
    }

    public Node[] getStack() {
        return stack.toArray(new Node[0]);
    }
}
