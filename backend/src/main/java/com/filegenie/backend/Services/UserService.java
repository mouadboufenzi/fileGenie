package com.filegenie.backend.Services;

import com.filegenie.backend.DTO.LoginRequest;
import com.filegenie.backend.DTO.RegisterRequest;
import com.filegenie.backend.Entities.User;
import com.filegenie.backend.Entities.UserSession;
import com.filegenie.backend.Repositories.UserRepository;
import com.filegenie.backend.Repositories.UserSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSessionRepository userSessionRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public void registerUser(RegisterRequest req) {
        User user = new User();
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setName(req.getName());
        user.setRole(User.Role.USER);
        userRepository.save(user);
    }

    public String loginUser(LoginRequest req) {
        Optional<User> userOpt = userRepository.findByEmail(req.getEmail());

        if (userOpt.isPresent() && encoder.matches(req.getPassword(), userOpt.get().getPassword())) {
            User user = userOpt.get();
            UserSession session = new UserSession();
            session.setUser(user);
            session.setSessionToken(UUID.randomUUID().toString());

            // Valid session for 2 hours after login
            session.setExpiresAt(LocalDateTime.now().plusHours(2));

            userSessionRepository.save(session);
            return session.getSessionToken();
        }

        throw new RuntimeException("Invalid email or password");
    }

    public User getAuthedUser(String token) {
        String clearedToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        Optional<UserSession> sessionOpt = userSessionRepository.findBySessionToken(clearedToken);

        // Token expired/invalid
        // => Should never happen as the AuthFilter disallow requests to invalid/expired tokens
        if (sessionOpt.isEmpty() || sessionOpt.get().getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("User not found or token invalid");
        }

        return sessionOpt.get().getUser();
    }
}
