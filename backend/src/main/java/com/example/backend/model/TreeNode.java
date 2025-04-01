package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class TreeNode {
    @JsonProperty("id")
    private int id;

    @JsonProperty("value")
    private int value;

    @JsonProperty("depth")
    private int depth;

    @JsonProperty("children")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private TreeNode[] children;

    public TreeNode(int id, int value, int childrenSize) {
        this.id = id;
        this.value = value;
        this.children = new TreeNode[childrenSize];
    }
}
