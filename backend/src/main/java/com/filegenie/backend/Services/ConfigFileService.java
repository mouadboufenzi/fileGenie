package com.filegenie.backend.Services;

import com.filegenie.backend.DTO.EditConfiguration;
import com.filegenie.backend.Entities.ConfigurationFile;
import com.filegenie.backend.Entities.User;
import com.filegenie.backend.Repositories.ConfigFileRepository;

import com.filegenie.backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConfigFileService {

    @Autowired
    private ConfigFileRepository configFileRepository;

    @Autowired
    private UserRepository userRepository;

    public void saveConfigFile(User user, EditConfiguration infos) {

        ConfigurationFile configurationFile = new ConfigurationFile();

        configurationFile.setConfigFile(infos.getConfiguration());
        configurationFile.setConfigVersion(infos.getVersion() == null ? "1.0" : infos.getVersion());

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
}

