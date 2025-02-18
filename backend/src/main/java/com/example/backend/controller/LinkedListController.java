package com.example.backend.controller;

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
import com.example.backend.service.LinkedListService;

@RestController
@RequestMapping("/linked-list")
@CrossOrigin(origins = "https://localhost:5174")
public class LinkedListController {
    private final LinkedListService linkedListService = new LinkedListService();

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@RequestParam String data) {
        linkedListService.insert(data);
        return ResponseEntity.ok("Inserted: " + data); // Fix: Return ResponseEntity
    }

    @GetMapping("/search")
    public Node search(@RequestParam String data) {
        return linkedListService.search(data);
    }

    @DeleteMapping("/delete/{data}")
    public ResponseEntity<String> delete(@PathVariable String data) {
        // Call the delete method from your service layer
        boolean deleted = linkedListService.delete(data);

        if (deleted) {
            return ResponseEntity.ok("Deleted: " + data); // If deletion is successful
        } else {
            return ResponseEntity.status(404).body("Node with data " + data + " not found"); // If node not found
        }
    }

    @GetMapping("/peek")
    public String peek() {
        return linkedListService.peek();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clear() {
        linkedListService.clear();
        return ResponseEntity.ok("List cleared"); // Added ResponseEntity
    }
}
