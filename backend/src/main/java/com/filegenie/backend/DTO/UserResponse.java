package com.filegenie.backend.DTO;

import com.filegenie.backend.Entities.User;
import lombok.Data;

@Data
public class UserResponse {
    private Long userId;
    private String email;
    private String name;
    private User.Role role;
}
