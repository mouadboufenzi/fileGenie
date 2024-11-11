package com.filegenie.backend.Services;

import com.filegenie.backend.Repositories.UserSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SessionCleanupService {
    @Autowired
    private UserSessionRepository userSessionRepository;

    @Scheduled(cron = "0 0 * * * *")
    public void removeExpiredSessions() {
        userSessionRepository.deleteAllByExpiresAtBefore(LocalDateTime.now());
    }
}
