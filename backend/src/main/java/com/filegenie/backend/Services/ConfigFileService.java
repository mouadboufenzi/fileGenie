package com.filegenie.backend.Services;

import com.filegenie.backend.DTO.EditConfiguration;
import com.filegenie.backend.DTO.HttpException;
import com.filegenie.backend.Entities.ConfigurationFile;
import com.filegenie.backend.Entities.User;
import com.filegenie.backend.Repositories.ConfigFileRepository;

import com.filegenie.backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ConfigFileService {

    @Autowired
    private ConfigFileRepository configFileRepository;

    @Autowired
    private UserRepository userRepository;

    public void saveConfigFile(User user, EditConfiguration infos) throws HttpException {

        ConfigurationFile configurationFile;

        if (infos.getConfigurationId() != null) {
            configurationFile = configFileRepository.findById(infos.getConfigurationId()).orElse(null);

            if (configurationFile == null) {
                throw new HttpException(HttpStatus.NOT_FOUND, "Fichier de configuration introuvable");
            }
        }
        else {
            configurationFile = new ConfigurationFile();
        }

        configurationFile.setConfigFile(infos.getConfiguration());
        configurationFile.setConfigName(infos.getConfigurationName());
        configurationFile.setConfigType(infos.getConfigurationType());

        if (configurationFile.getUsers() == null) {
            configurationFile.setUsers(new ArrayList<>());
        }

        if (user.getConfigurationFiles() == null) {
            user.setConfigurationFiles(new ArrayList<>());
        }

        configurationFile.getUsers().add(user);
        user.getConfigurationFiles().add(configurationFile);

        configFileRepository.save(configurationFile);
        userRepository.save(user);
    }

    public List<ConfigurationFile> getAllConfigurationOfUser(Long userId) {
        return configFileRepository.findAllByUserId(userId);
    }

    public ConfigurationFile getConfigurationFileById(Long configId, User user) throws HttpException {
        Optional<ConfigurationFile> res = configFileRepository.findById(configId);

        if (res.isPresent()) {
            if (res.get().getUsers().contains(user)) return res.get();
            else throw new HttpException(HttpStatus.FORBIDDEN, "Le fichier de configuration ne vous appartient pas");
        }
        else throw new HttpException(HttpStatus.NOT_FOUND, "Le fichier de configuration est introuvable");
    }

    public void deleteConfigurationFileById(Long configId, User user) throws HttpException {
        Optional<ConfigurationFile> res = configFileRepository.findById(configId);

        if (res.isPresent()) {
            ConfigurationFile configFile = res.get();
            if (configFile.getUsers().contains(user)) {
                // Remove the association with users
                for (User u : configFile.getUsers()) {
                    u.getConfigurationFiles().remove(configFile);
                }
                configFile.setUsers(new ArrayList<>()); // Clear the users list

                // Now delete the configuration file
                configFileRepository.delete(configFile);
            } else throw new HttpException(HttpStatus.FORBIDDEN, "Le fichier de configuration ne vous appartient pas");
        }
        else throw new HttpException(HttpStatus.NOT_FOUND, "Le fichier de configuration est introuvable");
    }
}

