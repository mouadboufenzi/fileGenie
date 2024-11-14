package com.filegenie.backend.Controllers;

import com.filegenie.backend.DTO.GenericResponse;
import com.filegenie.backend.DTO.HttpException;
import com.filegenie.backend.DTO.RegisterRequest;
import com.filegenie.backend.DTO.UserResponse;
import com.filegenie.backend.Entities.User;
import com.filegenie.backend.Services.UserService;
import io.swagger.v3.oas.annotations.OpenAPI31;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "User")
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo(
        @Parameter(hidden = true) // Already given in the "Authorize" popup
        @RequestHeader("Authorization")
        String token
    ) {
        User user;

        try {
            user = userService.getAuthedUser(token);
        } catch (HttpException notFound) {
            return new ResponseEntity<>(notFound, notFound.getStatus());
        }

        UserResponse response = new UserResponse();
        response.setUserId(user.getUserId());
        response.setEmail(user.getEmail());
        response.setName(user.getName());
        response.setRole(user.getRole());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/infos")
    public ResponseEntity<?> updateUserInfo(
        @RequestBody RegisterRequest req,
        @Parameter(hidden = true) // Already given in the "Authorize" popup
        @RequestHeader("Authorization")
        String token
    ) {
        try {
            User user = userService.getAuthedUser(token);
            userService.updateUser(user.getUserId(), req);

            GenericResponse response = new GenericResponse();
            response.setMessage("Utilisateur mis à jour");

            return ResponseEntity.ok(response);
        } catch (HttpException conflict) {
            return new ResponseEntity<>(conflict, conflict.getStatus());
        }
    }
}
