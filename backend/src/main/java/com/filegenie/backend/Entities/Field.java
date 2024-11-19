package com.filegenie.backend.Entities;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Field")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class Field {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fieldId;

    @Column(nullable = false, unique = true)
    private String name;

//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
    private String type;

    @OneToMany(mappedBy = "field", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude // Empêche les récursions infinies
    private List<FieldValue> fieldValues = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_field_id")
    @ToString.Exclude
    private Field parentField;

    @OneToMany(mappedBy = "parentField", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<Field> subFields;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    private ConfigurationFile configurationFile;

    public enum FieldType {
        VALUE,
        OBJECT,
        LIST,
    }
}



