package com.filegenie.backend.DTO;

import lombok.Data;

// TODO: add email verification?

@Data
public class LoginRequest {
    private String email;
    private String password;
}
