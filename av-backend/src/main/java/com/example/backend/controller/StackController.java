package com.example.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Node;
import com.example.backend.model.SearchResult;
import com.example.backend.service.StackService;

@RestController
@RequestMapping("api/stack")
public class StackController {
    private final StackService stackService = new StackService();

    @PostMapping("/insert")
    public ResponseEntity<?> push(@RequestParam String value) {
        stackService.push(value);
        Node[] updatedStack = stackService.getStack();
        return ResponseEntity.ok(updatedStack);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String value) {
        SearchResult result = stackService.search(value);
        if (result == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Node with value " + value + " not found");
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> pop() {
        String result = stackService.pop();
        if (result == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Stack is empty");
            return ResponseEntity.ok(response);
        }

        Node[] updatedStack = stackService.getStack();
        Map<Object, Object> response = new HashMap<>();
        response.put("deleteResult", result);
        response.put("stack", updatedStack);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/peek")
    public ResponseEntity<?> peek() {
        String result = stackService.peek();
        if (result == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Stack is empty");
            return ResponseEntity.ok(response);
        }

        getStack();

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clear() {
        boolean result = stackService.clear();
        if (!result) {
            HashMap<String, String> response = new HashMap<>();
            response.put("error", "Stack is Empty");
            return ResponseEntity.ok(response);
        }

        Node[] updatedStack = stackService.getStack();

        return ResponseEntity.ok(updatedStack);
    }

    @GetMapping("/stack")
    public Node[] getStack() {
        return stackService.getStack();
    }
}
