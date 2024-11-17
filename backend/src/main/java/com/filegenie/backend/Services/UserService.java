package com.filegenie.backend.Services;

import com.filegenie.backend.DTO.HttpException;
import com.filegenie.backend.DTO.LoginRequest;
import com.filegenie.backend.DTO.RegisterRequest;
import com.filegenie.backend.Entities.User;
import com.filegenie.backend.Entities.UserSession;
import com.filegenie.backend.Repositories.UserRepository;
import com.filegenie.backend.Repositories.UserSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSessionRepository userSessionRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public void registerUser(RegisterRequest req) throws HttpException {
        User user = new User();
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setName(req.getName());
        user.setRole(User.Role.USER);

        try {
            userRepository.save(user);
        } catch (Exception exception) {
            throw new HttpException(HttpStatus.UNAUTHORIZED, "Email déjà utilisé");
        }
    }

    /**
     * Log the user using the given credentials
     * @param req credentials request
     * @return JWT token
     * @throws RuntimeException When credentials are invalid or the user isn't found
     */
    public String loginUser(LoginRequest req) throws HttpException {
        Optional<User> userOpt = userRepository.findByEmail(req.getEmail());

        if (userOpt.isPresent() && encoder.matches(req.getPassword(), userOpt.get().getPassword())) {
            User user = userOpt.get();
            UserSession session = new UserSession();
            session.setUser(user);
            session.setSessionToken(UUID.randomUUID().toString());

            // Valid session for 2 hours after login
            session.setExpiresAt(LocalDateTime.now().plusHours(2));

            userSessionRepository.save(session);
            System.out.println("Voici le token de l'utilisateur : "+ session.getSessionToken());
            return session.getSessionToken();
        }

        throw new HttpException(HttpStatus.NOT_FOUND, "Identifiant invalide");
    }

    public User getAuthedUser(String token) throws HttpException {
        String clearedToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        Optional<UserSession> sessionOpt = userSessionRepository.findBySessionToken(clearedToken);

        // Token expired/invalid
        // => Should never happen as the AuthFilter disallow requests to invalid/expired tokens
        if (sessionOpt.isEmpty() || sessionOpt.get().getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new HttpException(HttpStatus.NOT_FOUND, "Utilisateur introuvable / Jeton invalide");
        }

        return sessionOpt.get().getUser();
    }

    public void updateUser(Long userId, RegisterRequest req) throws HttpException {
        if (userRepository.existsByEmailAndUserIdNot(req.getEmail(), userId)) {
            throw new HttpException(HttpStatus.CONFLICT, "Email déjà utilisé");
        }

        userRepository.findById(userId)
            .map(user -> {
                user.setName(req.getName());
                user.setEmail(req.getEmail());
                return userRepository.save(user);
            })
            .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "User not found"));
    }
}
