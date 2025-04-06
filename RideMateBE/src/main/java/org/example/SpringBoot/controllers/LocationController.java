package org.example.SpringBoot.controllers;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/search")
    public ResponseEntity<String> searchLocation(@RequestParam String q) {
        String url = "https://nominatim.openstreetmap.org/search?q=" + q + "&format=json&addressdetails=1&limit=5";

        // Set headers (important to mimic a browser request)
        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "YourApp (contact@yourapp.com)");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Forward the request to Nominatim
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response.getBody());
    }
}
