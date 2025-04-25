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
import com.example.backend.service.QueueService;

@RestController
@RequestMapping("api/queue")
public class QueueController {
    private final QueueService queueService = new QueueService();

    @PostMapping("/insert")
    public ResponseEntity<?> add(@RequestParam String value) {
        queueService.enqueue(value);
        Node[] updatedQueue = queueService.getQueue();
        return ResponseEntity.ok(updatedQueue);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String value) {
        SearchResult result = queueService.search(value);
        if (result == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Node with value " + value + " not found");
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> dequeue() {
        String result = queueService.dequeue();
        if (result == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Queue is empty");
            return ResponseEntity.ok(response);
        }

        Node[] updatedQueue = queueService.getQueue();
        Map<Object, Object> response = new HashMap<>();
        response.put("deleteResult", result);
        response.put("queue", updatedQueue);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/peek")
    public ResponseEntity<?> peek() {
        String result = queueService.peek();
        if (result == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Queue is empty");
            return ResponseEntity.ok(response);
        }

        getQueue();

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clear() {
        boolean result = queueService.clear();
        if (!result) {
            HashMap<String, String> response = new HashMap<>();
            response.put("error", "Queue is Empty");
            return ResponseEntity.ok(response);
        }

        Node[] updatedQueue = queueService.getQueue();

        return ResponseEntity.ok(updatedQueue);
    }

    @GetMapping("/queue")
    public Node[] getQueue() {
        return queueService.getQueue();
    }
}
