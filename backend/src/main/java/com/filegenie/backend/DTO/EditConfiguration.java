package com.filegenie.backend.DTO;

import com.filegenie.backend.Entities.ConfigurationFile;
import lombok.Data;

@Data
public class EditConfiguration {
    Long configurationId;
    String configurationName;
    String configuration;
    ConfigurationFile.ConfigType configurationType;
}
