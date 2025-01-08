package com.filegenie.backend.DTO;

import com.filegenie.backend.Entities.ConfigurationFile;
import lombok.Data;

import java.util.Optional;

@Data
public class EditConfiguration {
    String configurationName;
    String configuration;
    String version;
    ConfigurationFile.ConfigType configurationType;
}
