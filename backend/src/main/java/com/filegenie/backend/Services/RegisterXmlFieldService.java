package com.filegenie.backend.Services;

import com.filegenie.backend.Entities.Field;
import com.filegenie.backend.Entities.FieldValue;
import com.filegenie.backend.Repositories.FieldRepository;
import com.filegenie.backend.Repositories.FieldValueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegisterXmlFieldService {

    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private FieldValueRepository fieldValueRepository;


    public void saveXmlFields(List<Field> fields) {

        fields.forEach(this::saveOrUpdateField);
    }

    private void saveOrUpdateField(Field field) {
        Optional<Field> existingFieldOptional = fieldRepository.findByName(field.getName());
        System.out.println("j'execute cette fonction");
        if (existingFieldOptional.isPresent()) {
            // Si le champ existe déjà, mettre à jour ses valeurs
            updateFieldValues(existingFieldOptional.get(), field.getFieldValues());
            System.out.println("j'execute et oui le champs existe déjà");
        } else {
            // Sinon, traiter le parent et enregistrer le champ
            handleParentField(field);
            fieldRepository.save(field);
            saveSubFields(field);
        }
    }

    private void updateFieldValues(Field existingField, List<FieldValue> newFieldValues) {
        for (FieldValue newValue : newFieldValues) {
            System.out.println("Le champs existe et je mets juste la valeur à jour");
            boolean valueExists = existingField.getFieldValues().stream()
                    .anyMatch(existingValue -> existingValue.getValue().equals(newValue.getValue()));

            if (!valueExists) {
                FieldValue fieldValue = FieldValue.builder()
                        .value(newValue.getValue())
                        .field(existingField)
                        .build();
                fieldValueRepository.save(fieldValue);
            }
        }
    }

    private void handleParentField(Field field) {
        if (field.getParentField() != null) {
            Optional<Field> parentFieldOptional = fieldRepository.findByName(field.getParentField().getName());

            if (parentFieldOptional.isPresent()) {
                field.setParentField(parentFieldOptional.get());
            } else {
                fieldRepository.save(field.getParentField());
            }
        }
    }

    private void saveSubFields(Field parentField) {
        if (parentField.getSubFields() != null) {
            parentField.getSubFields().forEach(subField -> {
                subField.setParentField(parentField);
                saveOrUpdateField(subField);
            });
        }
    }
}

