package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class Node {
    @JsonProperty("id")
    private int id;

    @JsonProperty("value")
    private String value;

    @JsonProperty("nextId")
    private int nextId;

    public Node(int id, String value, int nextId) {
        this.id = id;
        this.value = value;
        this.nextId = nextId;
    }
}
