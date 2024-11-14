package com.filegenie.backend.Controllers;

import com.filegenie.backend.DTO.*;
import com.filegenie.backend.Services.UserSessionService;
import com.filegenie.backend.Services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Authentication")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserSessionService userSessionService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest req) {
        try {
            userService.registerUser(req);
            GenericResponse response = new GenericResponse();
            response.setMessage("User registered");
            return ResponseEntity.ok(response);
        } catch (HttpException unauthorized) {
            return new ResponseEntity<>(unauthorized, unauthorized.getStatus());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest req) {
        String sessionToken;

        try {
            sessionToken = userService.loginUser(req);
        } catch (HttpException notFoundException) {
            return new ResponseEntity<>(notFoundException, notFoundException.getStatus());
        }

        LoginResponse response = new LoginResponse();
        response.setToken(sessionToken);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/verify/{token}")
    public ResponseEntity<?> sessionHasExpired(
        @PathVariable("token")
        String token
    ) {
        try {
            boolean valid = userSessionService.verifyToken(token);

            GenericResponse res = new GenericResponse();
            res.setMessage(valid ? "Token OK" : "Token KO");

            return ResponseEntity.ok(res);

        } catch (HttpException notFound) {
            return new ResponseEntity<>(notFound, notFound.getStatus());
        }

    }
}
