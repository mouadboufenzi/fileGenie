package com.filegenie.backend.Services;

import com.filegenie.backend.Entities.Field;
import com.filegenie.backend.Entities.FieldValue;
import com.filegenie.backend.Repositories.FieldRepository;
import com.filegenie.backend.Repositories.FieldValueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FieldService {
    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private FieldValueRepository fieldValueRepository;

    public List<Field> getRootFields() {
        return fieldRepository.findByParentFieldIsNull();
    }

    public List<Field> getSubFields(Long parentId) {
        return fieldRepository.findByParentField_FieldId(parentId);
    }

    public Field addField(Field field) {
        return fieldRepository.save(field);
    }

    public void deleteField(Long id) {
        fieldRepository.deleteById(id);
    }

    public List<FieldValue> getFieldValues(Long fieldId) {
        return fieldValueRepository.findByField_FieldId(fieldId);
    }
}