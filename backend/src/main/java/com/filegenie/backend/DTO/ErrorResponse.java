package com.filegenie.backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ErrorResponse {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @JsonProperty
    private final int error;

    @JsonProperty
    private final String message;

    public ErrorResponse(int error, String message) {
        this.error = error;
        this.message = message;
    }

    public void sendErrorResponse(HttpServletResponse res) throws IOException {
        res.setContentType("application/json");
        res.setStatus(this.error);
        res.getWriter().write(objectMapper.writeValueAsString(this));
    }
}
