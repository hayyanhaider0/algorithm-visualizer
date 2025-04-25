package com.example.backend.service;

import com.example.backend.model.SearchResult;
import com.example.backend.model.TreeNode;

public class BSTService {
    private TreeNode root;
    private int childrenSize;
    private int size;
    private int id;

    public BSTService() {
        root = null;
        childrenSize = 2;
        size = 0;
        id = 0;
    }

    public boolean insert(int value) {
        if (size == 100)
            return false;

        TreeNode newNode = new TreeNode(id++, value, childrenSize);

        if (isEmpty()) {
            root = newNode;
            return true;
        }

        TreeNode current = root;
        TreeNode parent = null;

        while (current != null) {
            parent = current;

            if (value < current.getValue()) {
                current = current.getChildren()[0];
            } else if (value > current.getValue()) {
                current = current.getChildren()[1];
            } else {
                return false;
            }
        }

        if (value < parent.getValue()) {
            parent.getChildren()[0] = newNode;
        } else if (value > parent.getValue()) {
            parent.getChildren()[1] = newNode;
        }

        size++;

        return true;
    }

    public SearchResult search(int value) {
        if (isEmpty())
            return null;

        TreeNode current = root;
        int depth = 0;

        while (current != null) {
            current.setDepth(depth); // Set the depth of the current node
            if (value == current.getValue()) {
                return new SearchResult(value + "", depth);
            } else if (value < current.getValue()) {
                current = current.getChildren()[0]; // Go left
            } else {
                current = current.getChildren()[1]; // Go right
            }
            depth++; // Increment depth for the next node
        }

        return null;
    }

    public boolean delete(int value) {
        if (isEmpty())
            return false;

        TreeNode parent = null;
        TreeNode current = root;
        boolean isLeftChild = false;

        // Find the node to delete
        while (current != null && current.getValue() != value) {
            parent = current;
            if (value < current.getValue()) {
                current = current.getChildren()[0];
                isLeftChild = true;
            } else {
                current = current.getChildren()[1];
                isLeftChild = false;
            }
        }

        if (current == null)
            return false; // Node not found

        // Case 1: Node has no children (leaf node)
        if (current.getChildren()[0] == null && current.getChildren()[1] == null) {
            if (current == root) {
                root = null;
            } else if (parent != null) {
                if (isLeftChild) {
                    parent.getChildren()[0] = null;
                } else {
                    parent.getChildren()[1] = null;
                }
            }
        }
        // Case 2: Node has one child
        else if (current.getChildren()[0] == null) { // Only right child
            if (current == root) {
                root = current.getChildren()[1];
            } else if (parent != null) {
                if (isLeftChild) {
                    parent.getChildren()[0] = current.getChildren()[1];
                } else {
                    parent.getChildren()[1] = current.getChildren()[1];
                }
            }
        } else if (current.getChildren()[1] == null) { // Only left child
            if (current == root) {
                root = current.getChildren()[0];
            } else if (parent != null) {
                if (isLeftChild) {
                    parent.getChildren()[0] = current.getChildren()[0];
                } else {
                    parent.getChildren()[1] = current.getChildren()[0];
                }
            }
        }
        // Case 3: Node has two children
        else {
            TreeNode successor = getSuccessor(current);
            if (current == root) {
                root = successor;
            } else if (parent != null) {
                if (isLeftChild) {
                    parent.getChildren()[0] = successor;
                } else {
                    parent.getChildren()[1] = successor;
                }
                successor.setDepth(parent.getDepth() + 1);
            }
            successor.getChildren()[0] = current.getChildren()[0];
        }

        size--;

        return true;
    }

    private TreeNode getSuccessor(TreeNode node) {
        TreeNode successorParent = node;
        TreeNode successor = node.getChildren()[1];
        TreeNode current = successor;
        while (current.getChildren()[0] != null) {
            successorParent = successor;
            successor = current.getChildren()[0];
            current = current.getChildren()[0];
        }
        if (successor != node.getChildren()[1]) {
            successorParent.getChildren()[0] = successor.getChildren()[1];
            successor.getChildren()[1] = node.getChildren()[1];
        }
        return successor;
    }

    public Integer peek() {
        if (isEmpty())
            return null;
        return root.getValue();
    }

    public boolean clear() {
        if (isEmpty())
            return false;
        root = null;
        id = 0;
        size = 0;
        return true;
    }

    public TreeNode getRoot() {
        return root;
    }

    public boolean isEmpty() {
        return root == null;
    }
}
