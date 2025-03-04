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
import com.example.backend.service.BSTService;

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

        return ResponseEntity.ok(bstService.getTree());
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String value) {
        SearchResult result = bstService.search(value);
        Map<String, Object> response = new HashMap<>();
        if (result == null) {
            response.put("error", "Value " + value + " not found");
            return ResponseEntity.ok(response);
        }
        response.put("searchResult", result);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{value}")
    public ResponseEntity<?> delete(@PathVariable String value) {
        boolean result = bstService.delete(value);
        Map<String, String> response = new HashMap<>();
        if (!result) {
            response.put("error", "Value " + value + " not found");
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.ok(bstService.getTree());
    }

    @GetMapping("/peek")
    public ResponseEntity<?> peek() {
        String result = bstService.peek();
        Map<String, String> response = new HashMap<>();
        if (result == null) {
            response.put("error", "The binary search tree is empty");
            return ResponseEntity.ok(response);
        }
        response.put("peek", result);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clear() {
        boolean result = bstService.clear();
        Map<String, String> response = new HashMap<>();

        if (!result) {
            response.put("error", "The binary search tree is empty");
            return ResponseEntity.ok(response);
        }

        // RETURN TOARRAY INSTEAD
        return ResponseEntity.ok(bstService.getTree());
    }

    @GetMapping("/list")
    public ResponseEntity<?> list() {
        return ResponseEntity.ok(bstService.getTree());
    }
}
