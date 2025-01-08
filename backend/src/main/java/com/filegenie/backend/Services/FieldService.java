package com.filegenie.backend.Services;

import com.filegenie.backend.Entities.Field;
import com.filegenie.backend.Entities.FieldValue;
import com.filegenie.backend.Repositories.FieldRepository;
import com.filegenie.backend.Repositories.FieldValueRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    @Transactional
    public void updateFieldsTree(Map<String, Object> updatedTree) {
        List<Map<String, Object>> fields = (List<Map<String, Object>>) updatedTree.get("fields");
        if (fields != null) {
            for (Map<String, Object> fieldData : fields) {
                processFieldFromMap(null, fieldData);
            }
        }
    }

    @Transactional
    public void processFieldFromMap(Field parent, Map<String, Object> fieldData) {
        Field field = new Field();
        field.setName((String) fieldData.get("name"));
        field.setType((Field.FieldType) fieldData.get("type"));
        field.setParentField(parent);


        Optional<Field> existingFieldOptional = fieldRepository.findByName(field.getName());
        if (existingFieldOptional.isPresent()) {
            field = existingFieldOptional.get();
            field.setType((Field.FieldType) fieldData.get("type"));
        } else {
            field = fieldRepository.save(field);
        }


        List<String> values = (List<String>) fieldData.get("values");
        if (values != null) {

            fieldValueRepository.deleteByField(field);


            for (String value : values) {
                FieldValue fieldValue = new FieldValue();
                fieldValue.setValue(value);
                fieldValue.setField(field);
                fieldValueRepository.save(fieldValue);
            }
        }


        List<Map<String, Object>> subFields = (List<Map<String, Object>>) fieldData.get("children");
        if (subFields != null) {
            for (Map<String, Object> subFieldData : subFields) {
                processFieldFromMap(field, subFieldData);
            }
        }
    }

    public void deleteAllFields() {
        List<Field> fields = fieldRepository.findAll();
        if (!fields.isEmpty()) {
            fieldRepository.deleteAll();
        }
    }
}