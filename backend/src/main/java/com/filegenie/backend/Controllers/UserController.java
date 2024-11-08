package com.filegenie.backend.Controllers;

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
    public ResponseEntity<UserResponse> getUserInfo(
        @Parameter(hidden = true) // Already given in the "Authorize" popup
        @RequestHeader("Authorization")
        String token
    ) {
        User user = userService.getAuthedUser(token);

        UserResponse response = new UserResponse();
        response.setUserId(user.getUserId());
        response.setEmail(user.getEmail());
        response.setName(user.getName());
        response.setRole(user.getRole());

        return ResponseEntity.ok(response);
    }
}
