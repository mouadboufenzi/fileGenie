package com.filegenie.backend.Controllers;

import com.filegenie.backend.DTO.LoginRequest;
import com.filegenie.backend.DTO.RegisterRequest;
import com.filegenie.backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// TODO: Send JSON details of the created/logged user rather than a plain text message

@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/testing")
    public ResponseEntity<String> testing() {
        return ResponseEntity.ok("Hello World");
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest req) {
        userService.registerUser(req);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest req) {
        String sessionToken = userService.loginUser(req);
        return ResponseEntity.ok("Login successful. Session Token: " + sessionToken);
    }
}
