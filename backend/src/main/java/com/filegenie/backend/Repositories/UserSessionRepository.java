package com.filegenie.backend.Repositories;

import com.filegenie.backend.Entities.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface UserSessionRepository extends JpaRepository<UserSession, Long> {
    Optional<UserSession> findBySessionToken(String sessionToken);
    void deleteAllByExpiresAtBefore(LocalDateTime dateTime);
}
