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
public class RegisterJsonFieldService {

    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private FieldValueRepository fieldValueRepository;

    public void saveJsonFields(List<Field> fields) {
        

            for (Field field : fields) {

                Optional<Field> existingFieldOptional = fieldRepository.findByName(field.getName());

                if (existingFieldOptional.isPresent()) {
                    Field existingField = existingFieldOptional.get();

                    for (FieldValue value : field.getFieldValues()) {
                        boolean valueExists = existingField.getFieldValues().stream()
                                .anyMatch(existingValue -> existingValue.getValue().equals(value.getValue()));

                        if (!valueExists) {
                            FieldValue newValue = FieldValue.builder()
                                    .value(value.getValue())
                                    .field(existingField)
                                    .build();
                            fieldValueRepository.save(newValue);
                        }
                    }
                } else {
                    fieldRepository.save(field);
                }
            }
        }


}
