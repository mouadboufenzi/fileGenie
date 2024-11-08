package com.filegenie.backend.Filters;

import com.filegenie.backend.Entities.UserSession;
import com.filegenie.backend.DTO.HttpException;
import com.filegenie.backend.Repositories.UserSessionRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@Component
public class AuthFilter extends OncePerRequestFilter {
    @Autowired
    private UserSessionRepository userSessionRepository;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest req) {
        String path = req.getServletPath();

        // Auth required for all /api/, except for login/register (anything under /api/auth/)
        return !path.startsWith("/api/") || path.startsWith("/api/auth");
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest req,
        HttpServletResponse res,
        FilterChain filterChain
    ) throws ServletException, IOException {
        String authHeader = req.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Optional<UserSession> sessionOpt = userSessionRepository.findBySessionToken(token);

            // Valid Session
            if (sessionOpt.isPresent() && sessionOpt.get().getExpiresAt().isAfter(LocalDateTime.now())) {
                filterChain.doFilter(req, res);
                return;
            }
        }

        if (authHeader == null) {
            HttpException error = new HttpException(HttpStatus.FORBIDDEN, "Forbidden: Missing session token");
            error.sendErrorResponse(res);
            return;
        }

        HttpException error = new HttpException(HttpStatus.UNAUTHORIZED, "Unauthorized: Invalid or expired session token");
        error.sendErrorResponse(res);
    }
}
