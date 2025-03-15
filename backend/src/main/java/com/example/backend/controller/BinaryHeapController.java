package com.example.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.model.TreeNode;
import com.example.backend.service.BinaryHeapService;

@RestController
@RequestMapping("/api/heap")
@CrossOrigin(origins = "http://localhost:5173")
public class BinaryHeapController {

    private final BinaryHeapService heapService = new BinaryHeapService(true); // Default as min-heap

    // Insert a value into the heap
    @PostMapping("/insert")
    public ResponseEntity<?> insert(@RequestParam String value) {
        boolean result = heapService.insert(value);
        Map<String, String> response = new HashMap<>();

        if (!result) {
            response.put("error", "Failed to insert value " + value);
            return ResponseEntity.ok(response);
        }

        // Return the tree for visualization
        return ResponseEntity.ok(heapService.getRoot());
    }

    // Peek at the root of the heap
    @GetMapping("/peek")
    public ResponseEntity<?> peek() {
        String result = heapService.peek();
        Map<String, String> response = new HashMap<>();

        if (result == null) {
            response.put("error", "Heap is empty");
            return ResponseEntity.ok(response);
        }

        response.put("result", result);
        return ResponseEntity.ok(response);
    }

    // Delete a specific value from the heap
    @DeleteMapping("/delete/{value}")
    public ResponseEntity<?> delete(@PathVariable String value) {
        boolean result = heapService.delete(value);
        Map<String, String> response = new HashMap<>();

        if (!result) {
            response.put("error", "Value " + value + " not found");
            return ResponseEntity.ok(response);
        }

        // Return the updated tree for visualization
        return ResponseEntity.ok(heapService.getRoot());
    }

    @GetMapping("/extract")
    public ResponseEntity<?> extractRoot() {
        String extractedValue = heapService.extractRoot();
        Map<String, String> response = new HashMap<>();

        if (extractedValue == null) {
            response.put("error", "Heap is empty");
            return ResponseEntity.ok(response);
        }

        response.put("result", extractedValue);
        return ResponseEntity.ok(response);
    }

    // Clear the entire heap
    @DeleteMapping("/clear")
    public ResponseEntity<?> clear() {
        heapService.clear();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Heap cleared successfully");
        return ResponseEntity.ok(response);
    }

    // Toggle between min-heap and max-heap types
    @GetMapping("/toggle")
    public ResponseEntity<?> toggleHeap() {
        heapService.toggleHeapType();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Heap type toggled successfully");
        return ResponseEntity.ok(response);
    }

    // Get the tree visualization (with proper children pointers)
    @GetMapping("/tree")
    public ResponseEntity<?> getTree() {
        TreeNode root = heapService.getRoot();

        if (root == null) {
            Map<String, String> response = new HashMap<>();
            response.put("root", "empty");
            return ResponseEntity.ok(response);
        }

        // Create the response map with root and array
        Map<String, Object> response = new HashMap<>();
        response.put("root", root); // This will be serialized into JSON
        response.put("array", heapService.toArray()); // The array of elements

        return ResponseEntity.ok(response);
    }

    // Get the array representation of the heap (for list visualization)
    @GetMapping("/toArray")
    public ResponseEntity<?> toArray() {
        return ResponseEntity.ok(heapService.toArray());
    }
}
