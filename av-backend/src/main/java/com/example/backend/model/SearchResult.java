package com.example.backend.model;

public class SearchResult {
    private String value;
    private int index;

    public SearchResult(String value, int index) {
        this.value = value;
        this.index = index;
    }

    public String getValue() {
        return value;
    }

    public int getIndex() {
        return index;
    }
}
