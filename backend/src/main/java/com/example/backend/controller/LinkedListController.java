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

import com.example.backend.model.Node;
import com.example.backend.model.SearchResult;
import com.example.backend.service.LinkedListService;

@RestController
@RequestMapping("api/linked-list")
@CrossOrigin(origins = "*")
public class LinkedListController {
    private final LinkedListService linkedListService = new LinkedListService();

    @PostMapping("/insert")
    public ResponseEntity<?> insert(@RequestParam String value) {
        linkedListService.insert(value);
        Node[] updatedList = linkedListService.getList();
        return ResponseEntity.ok(updatedList);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String value) {
        SearchResult result = linkedListService.search(value);
        if (result == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Node with value " + value + " not found");
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete/{value}")
    public ResponseEntity<?> delete(@PathVariable String value) {
        // Call the delete method from your service layer
        boolean deleted = linkedListService.delete(value);

        if (!deleted) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Node with value " + value + " not found");
            return ResponseEntity.ok(response);
        }

        Node[] updatedList = linkedListService.getList();

        return ResponseEntity.ok(updatedList);
    }

    @GetMapping("/peek")
    public ResponseEntity<?> peek() {
        Node result = linkedListService.peek();

        if (result == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Linked list is empty");
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clear() {
        boolean result = linkedListService.clear();

        if (!result) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Linked list is empty");
            return ResponseEntity.ok(response);
        }

        Node[] updatedList = {};
        return ResponseEntity.ok(updatedList);
    }

    @GetMapping("/list")
    public Node[] getList() {
        return linkedListService.getList();
    }
}
