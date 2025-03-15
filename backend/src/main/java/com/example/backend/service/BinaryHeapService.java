package com.example.backend.service;

import java.util.LinkedList;
import java.util.Queue;
import com.example.backend.model.TreeNode;

public class BinaryHeapService {
    private TreeNode root;
    private int childrenSize;
    private boolean isMinHeap;
    private int id;

    public BinaryHeapService(boolean isMinHeap) {
        this.root = null;
        this.childrenSize = 2;
        this.isMinHeap = isMinHeap;
        this.id = 0;
    }

    // Insert a new value into the heap.
    public boolean insert(String data) {
        TreeNode newNode = new TreeNode(id++, data, childrenSize);
        if (root == null) {
            root = newNode;
        } else {
            // Insert using level-order (BFS) and get the inserted node.
            TreeNode insertedNode = insertNode(root, newNode);
            // Heapify up from the newly inserted node.
            heapifyUp(insertedNode);
        }
        return true;
    }

    // Insert newNode using level-order traversal and return the inserted node.
    private TreeNode insertNode(TreeNode parent, TreeNode newNode) {
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(parent);
        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();
            if (current.getChildren()[0] == null) {
                current.getChildren()[0] = newNode;
                return newNode;
            } else {
                queue.add(current.getChildren()[0]);
            }
            if (current.getChildren()[1] == null) {
                current.getChildren()[1] = newNode;
                return newNode;
            } else {
                queue.add(current.getChildren()[1]);
            }
        }
        return null; // Should never happen if tree is complete.
    }

    // Heapify up: move the node upward until the heap property is restored.
    private void heapifyUp(TreeNode node) {
        while (node != null) {
            TreeNode parent = getParent(node);
            if (parent != null && shouldSwap(node, parent)) {
                swap(node, parent);
                node = parent;
            } else {
                break;
            }
        }
    }

    // Get the parent of a given node using BFS.
    private TreeNode getParent(TreeNode target) {
        if (root == target)
            return null;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();
            if (current.getChildren()[0] == target || current.getChildren()[1] == target) {
                return current;
            }
            if (current.getChildren()[0] != null) {
                queue.add(current.getChildren()[0]);
            }
            if (current.getChildren()[1] != null) {
                queue.add(current.getChildren()[1]);
            }
        }
        return null;
    }

    // Swap the data of two nodes.
    private void swap(TreeNode node1, TreeNode node2) {
        String temp = node1.getData();
        node1.setData(node2.getData());
        node2.setData(temp);
    }

    // Determine if a swap is needed (min-heap: parent's value should be <=
    // child's).
    private boolean shouldSwap(TreeNode child, TreeNode parent) {
        return isMinHeap
                ? child.getData().compareTo(parent.getData()) < 0
                : child.getData().compareTo(parent.getData()) > 0;
    }

    // Peek the root value.
    public String peek() {
        if (isEmpty())
            return null;
        return root.getData();
    }

    // Delete a node with the given value from the heap.
    public boolean delete(String data) {
        if (root == null)
            return false;
        TreeNode nodeToDelete = findNode(root, data);
        if (nodeToDelete == null)
            return false;
        TreeNode lastNode = getLastNode();
        if (lastNode == null)
            return false; // Should not occur.
        // Swap the target with the last node.
        swap(nodeToDelete, lastNode);
        // Remove the last node from the tree.
        removeLastNode();
        // Restore the heap property.
        heapifyDown(nodeToDelete);
        heapifyUp(nodeToDelete);
        return true;
    }

    // Find a node by value using a recursive search.
    private TreeNode findNode(TreeNode node, String data) {
        if (node == null)
            return null;
        if (node.getData().equals(data))
            return node;
        TreeNode leftResult = findNode(node.getChildren()[0], data);
        if (leftResult != null)
            return leftResult;
        return findNode(node.getChildren()[1], data);
    }

    // Extract the root value from the heap.
    public String extractRoot() {
        if (root == null)
            return null;
        String result = root.getData();
        TreeNode lastNode = getLastNode();
        if (lastNode == root) {
            root = null;
        } else {
            root.setData(lastNode.getData());
            removeLastNode();
            heapifyDown(root);
        }
        return result;
    }

    // Get the last node in level-order using BFS.
    private TreeNode getLastNode() {
        if (root == null)
            return null;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        TreeNode last = null;
        while (!queue.isEmpty()) {
            last = queue.poll();
            if (last.getChildren()[0] != null)
                queue.add(last.getChildren()[0]);
            if (last.getChildren()[1] != null)
                queue.add(last.getChildren()[1]);
        }
        return last;
    }

    // Remove the last node from the tree.
    private void removeLastNode() {
        if (root == null)
            return;
        TreeNode last = getLastNode();
        if (last == root) {
            root = null;
            return;
        }
        TreeNode parent = getParent(last);
        if (parent != null) {
            if (parent.getChildren()[1] == last) {
                parent.getChildren()[1] = null;
            } else if (parent.getChildren()[0] == last) {
                parent.getChildren()[0] = null;
            }
        }
    }

    // Heapify down: push the node downward to restore the heap property.
    private void heapifyDown(TreeNode node) {
        while (node != null) {
            TreeNode left = node.getChildren()[0];
            TreeNode right = node.getChildren()[1];
            TreeNode swapCandidate = null;
            if (left != null && right != null) {
                swapCandidate = shouldSwap(left, right) ? left : right;
            } else if (left != null) {
                swapCandidate = left;
            } else if (right != null) {
                swapCandidate = right;
            }
            if (swapCandidate != null && shouldSwap(swapCandidate, node)) {
                swap(node, swapCandidate);
                node = swapCandidate;
            } else {
                break;
            }
        }
    }

    // Return the root (for tree visualization).
    public TreeNode getRoot() {
        return root;
    }

    // Return the heap as an array (level-order) of data values.
    public String[] toArray() {
        if (root == null)
            return new String[0];
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        LinkedList<String> list = new LinkedList<>();
        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();
            list.add(current.getData());
            if (current.getChildren()[0] != null)
                queue.add(current.getChildren()[0]);
            if (current.getChildren()[1] != null)
                queue.add(current.getChildren()[1]);
        }
        return list.toArray(new String[0]);
    }

    // Check if the heap is empty.
    public boolean isEmpty() {
        return root == null;
    }

    // Clear the heap.
    public void clear() {
        root = null;
    }

    public boolean isMinHeap() {
        return isMinHeap;
    }

    public void toggleHeapType() {
        isMinHeap = !isMinHeap;
        reheapify();
    }

    // Rebuild the entire heap based on the current heap type.
    private void reheapify() {
        if (root != null) {
            heapifyDown(root);
        }
    }
}
