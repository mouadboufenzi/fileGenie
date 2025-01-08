package com.filegenie.backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "configuration_files")
public class ConfigurationFile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long configId;

    @Column(nullable = false)
    private String configName;

    @Column(nullable = false)
    private ConfigType configType;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String ConfigFile;

    @ManyToMany(mappedBy = "configurationFiles", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JsonIgnore
    private List<User> users;

    public enum ConfigType {
        XML,
        JSON,
        YAML,
        CSV,
    }
}
