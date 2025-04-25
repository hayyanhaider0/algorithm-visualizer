package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.health.HealthEndpoint;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/")
public class AlgorithmController {

    @Value("${spring.application.name}")
    private String name;

    @Value("${spring.application.version}")
    private String version;

    @Value("${spring.application.description}")
    private String description;

    private final long startTime = System.currentTimeMillis();

    private final HealthEndpoint healthEndpoint; // Inject HealthEndpoint for dynamic health status

    // Constructor injection for HealthEndpoint
    public AlgorithmController(HealthEndpoint healthEndpoint) {
        this.healthEndpoint = healthEndpoint;
    }

    @GetMapping("/metadata")
    public Map<String, String> getMetaData() {
        long uptimeMillis = System.currentTimeMillis() - startTime;
        String uptime = formatUptime(uptimeMillis);

        // Dynamically fetch health status from HealthEndpoint
        String healthStatus = healthEndpoint.health().getStatus().getCode();

        return Map.of(
                "name", name,
                "version", version,
                "description", description,
                "status", healthStatus,
                "uptime", uptime);
    }

    private String formatUptime(long millis) {
        long hours = TimeUnit.MILLISECONDS.toHours(millis);
        long minutes = TimeUnit.MILLISECONDS.toMinutes(millis) % 60;
        long seconds = TimeUnit.MILLISECONDS.toSeconds(millis) % 60;

        return String.format("%02d hours, %02d minutes, %02d seconds", hours,
                minutes, seconds);
    }
}
