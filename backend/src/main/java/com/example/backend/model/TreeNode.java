package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class TreeNode {
    @JsonProperty
    private int id;

    @JsonProperty
    private String data;

    private TreeNode[] children;

    @JsonProperty
    private int[] childrenId;

    public TreeNode(int id, String value, int childrenSize) {
        this.id = id;
        this.data = value;
        this.children = new TreeNode[childrenSize];
        this.childrenId = new int[childrenSize];
    }

    public TreeNode(int id, String data, int[] childrenId) {
        this.id = id;
        this.data = data;
        this.childrenId = childrenId;
    }
}
