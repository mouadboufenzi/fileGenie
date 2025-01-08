package com.filegenie.backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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
    private String configVersion;

    @Column(nullable = false)
    private ConfigType configType;

    @Column(nullable = false)
    private String ConfigFile;

    @ManyToMany(mappedBy = "configurationFiles", cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<User> users;

    public enum ConfigType {
        XML,
        JSON,
        YAML,
        CSV,
    }
}
