package com.example.backend.service;

import com.example.backend.model.Node;
import com.example.backend.model.SearchResult;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class LinkedListService {
    private List<Node> linkedList = new ArrayList<>();
    private int id = 0;

    public void insert(String value) {
        Node newNode = new Node(id++, value, -1);

        if (linkedList.isEmpty()) {
            linkedList.add(newNode);
        } else {
            Node previousNode = linkedList.get(linkedList.size() - 1);
            previousNode.setNextId(newNode.getId());
            linkedList.add(newNode);
        }
    }

    public SearchResult search(String value) {
        if (linkedList.isEmpty())
            return null;

        for (int i = 0; i < linkedList.size(); i++) {
            Node node = linkedList.get(i);

            if (node.getValue().equals(value)) {
                return new SearchResult(node.getValue(), i);
            }
        }

        return null;
    }

    public boolean delete(String value) {
        if (linkedList.isEmpty())
            return false;

        for (int i = 0; i < linkedList.size(); i++) {
            Node node = linkedList.get(i);

            if (node.getValue().equals(value)) {
                if (i > 0) {
                    Node previousNode = linkedList.get(i - 1);

                    if (i == linkedList.size() - 1) {
                        previousNode.setNextId(-1);
                    } else {
                        Node nextNode = linkedList.get(i + 1);
                        previousNode.setNextId(nextNode.getId());
                    }
                }

                linkedList.remove(node);
                return true;
            }
        }

        return false;
    }

    public Node peek() {
        if (linkedList.isEmpty())
            return null;
        return linkedList.get(0);
    }

    public boolean clear() {
        if (linkedList.isEmpty())
            return false;
        id = 0;
        linkedList.clear();
        return true;
    }

    public Node[] getList() {
        return linkedList.toArray(new Node[0]);
    }
}
