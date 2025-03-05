package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class TreeNode {
    @JsonProperty
    private int id;

    @JsonProperty
    private String data;

    @JsonProperty
    private int depth;

    @JsonProperty
    private TreeNode[] children;

    public TreeNode(int id, String value, int childrenSize) {
        this.id = id;
        this.data = value;
        this.children = new TreeNode[childrenSize];
    }
}
