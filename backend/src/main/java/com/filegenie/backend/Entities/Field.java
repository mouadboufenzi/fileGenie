package com.filegenie.backend.Entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import lombok.Builder;


@Entity
@Table(name = "Field")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Field {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fieldId;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)

    @Column(nullable = false)
    private FieldType type;

    @Column(columnDefinition = "TEXT")
    private String value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_field_id")
    private Field parentField;

    @OneToMany(mappedBy = "parentField", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Field> subFields;

    @ManyToOne(fetch = FetchType.LAZY)
    private ConfigurationFile configurationFile;

    public enum FieldType {
        VALUE,
        OBJECT,
        LIST,
    }
}


