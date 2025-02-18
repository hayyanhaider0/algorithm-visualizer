package com.example.backend.service;

import com.example.backend.model.Node;
import org.springframework.stereotype.Service;

@Service
public class LinkedListService {
    private Node head = null;
    private Node tail = null;

    public void insert(String data) {
        Node newNode = new Node(data);

        if (head == null) {
            head = newNode;
            tail = newNode;
        } else {
            tail.next = newNode;
            tail = tail.next;
        }
    }

    public Node search(String data) {
        if (head == null)
            return null;

        Node current = head;

        while (current != null) {
            if (current.data.equals(data)) {
                return current;
            }

            current = current.next;
        }

        return null;
    }

    public boolean delete(String data) {
        if (head == null)
            return false;

        Node current = head;
        Node previous = null;

        while (current != null) {
            if (current.data.equals(data)) {
                if (previous == null) {
                    head = current.next;
                    if (head == null)
                        tail = null;
                } else {
                    previous.next = current.next;
                    if (current.next == null)
                        tail = previous;
                }
                return true;
            }

            previous = current;
            current = current.next;
        }

        return false;
    }

    public String peek() {
        return head.data;
    }

    public void clear() {
        head = null;
        tail = null;
    }
}
