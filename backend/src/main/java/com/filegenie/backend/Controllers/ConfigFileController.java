package com.filegenie.backend.Controllers;

import com.filegenie.backend.DTO.EditConfiguration;
import com.filegenie.backend.DTO.GenericResponse;
import com.filegenie.backend.Entities.ConfigurationFile;
import com.filegenie.backend.Entities.User;
import com.filegenie.backend.Entities.UserSession;
import com.filegenie.backend.Repositories.UserSessionRepository;
import com.filegenie.backend.Services.ConfigFileService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Tag(name = "Configurations")
@RestController
@RequestMapping(path="/api/config")
public class ConfigFileController {

    @Autowired
    private ConfigFileService configFileService;

    @Autowired
    private UserSessionRepository userSessionRepository;

    @PostMapping("/save")
    public ResponseEntity<?> saveConfigFile(
            @RequestBody EditConfiguration infos,
            @Parameter(hidden = true) // hidden in Swagger
            @RequestHeader("Authorization") String authHeader
    ){
        // find the current user based on it's token inside the header
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Optional<UserSession> sessionOpt = userSessionRepository.findBySessionToken(token);

            // user not found
            if (sessionOpt.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            User user = sessionOpt.get().getUser();
            configFileService.saveConfigFile(user, infos);
            GenericResponse res = new GenericResponse();
            res.setMessage("Configuration sauvegardée");
            return ResponseEntity.ok(res);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/{userId}/configs")
    public ResponseEntity<List<ConfigurationFile>> getConfigurationFilesOfUser(@PathVariable Long userId) {
        return ResponseEntity.ok(configFileService.getAllConfigurationOfUser(userId));
    }
}
