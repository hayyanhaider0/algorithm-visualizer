package com.example.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.SearchResult;
import com.example.backend.model.TreeNode;
import com.example.backend.service.BSTService;

import io.micrometer.core.ipc.http.HttpSender.Response;

@RestController
@RequestMapping("/api/bst")
@CrossOrigin(origins = "http://localhost:5173")
public class BSTController {
    private final BSTService bstService = new BSTService();

    @PostMapping("/insert")
    public ResponseEntity<?> insert(@RequestParam String value) {
        boolean result = bstService.insert(value);
        Map<String, String> response = new HashMap<>();

        if (!result) {
            response.put("error", value + " is a duplicate value");
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.ok(bstService.getRoot());
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String value) {
        SearchResult result = bstService.search(value);

        if (result == null) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Value " + value + " not found");
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete/{value}")
    public ResponseEntity<?> delete(@PathVariable String value) {
        boolean result = bstService.delete(value);
        Map<String, String> response = new HashMap<>();
        if (!result) {
            response.put("error", "Value " + value + " not found");
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.ok(bstService.getRoot());
    }

    @GetMapping("/peek")
    public ResponseEntity<?> peek() {
        String result = bstService.peek();
        if (result == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "The binary search tree is empty");
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clear() {
        boolean result = bstService.clear();
        Map<String, String> response = new HashMap<>();

        if (!result) {
            response.put("error", "The binary search tree is already empty");
        } else {
            response.put("message", "Binary search tree cleared successfully");
            response.put("root", "null");
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/tree")
    public ResponseEntity<?> tree() {
        TreeNode result = bstService.getRoot();

        if (result == null) {
            Map<String, String> response = new HashMap<>();
            response.put("root", "empty");
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.ok(bstService.getRoot());
    }
}
