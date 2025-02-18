package com.example.backend.model;

public class Node {
    public int id;
    public String data;
    public Node next;

    public Node(String data) {
        this.id = id++;
        this.data = data;
        this.next = null;
    }
}
