package com.filegenie.backend.DTO;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;

import java.io.IOException;

@JsonAutoDetect(getterVisibility = JsonAutoDetect.Visibility.NONE) // Only keep @JsonProperty properties
public class HttpException extends Exception {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpStatus httpStatus;

    @JsonProperty
    private final int error;
    @JsonProperty
    private final String message;

    public HttpException(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.error = httpStatus.value();
        this.message = message;
    }

    public HttpStatus getStatus() {
        return this.httpStatus;
    }

    public void sendErrorResponse(HttpServletResponse res) throws IOException {
        res.setContentType("application/json");
        res.setStatus(this.error);
        res.getWriter().write(objectMapper.writeValueAsString(this));
    }
}
