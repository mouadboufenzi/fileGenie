package com.filegenie.backend.Services;

import com.filegenie.backend.Entities.Field;
import com.filegenie.backend.Entities.FieldValue;
import com.filegenie.backend.DTO.HttpException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.Yaml;

import java.io.File;
import java.io.FileInputStream;
import java.util.*;

@Service
public class YamlParserService {

    public List<Field> parseYamlToFields(File yamlFile) throws HttpException {
        if (yamlFile == null || !yamlFile.exists()) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Le fichier YML fourni est invalide ou inexistant.");
        }

        try {
            Yaml yaml = new Yaml();
            Map<String, Object> yamlData = yaml.load(new FileInputStream(yamlFile));
            return processYamlNode(null, yamlData);
        } catch (Exception e) {
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Impossible de parser le fichier YML: " + e.getMessage());
        }
    }

    private List<Field> processYamlNode(Field parent, Map<String, Object> yamlMap) {
        List<Field> fields = new ArrayList<>();

        yamlMap.forEach((key, value) -> {
            Field field = new Field();
            field.setName(key);
            field.setParentField(parent);

            if (value instanceof Map) {
                // Si la valeur est un objet
                field.setType(Field.FieldType.OBJECT);
                fields.add(field);
                fields.addAll(processYamlNode(field, (Map<String, Object>) value));
            } else if (value instanceof List) {
                // Si la valeur est une liste, ajouter chaque élément en tant que FieldValue
                field.setType(Field.FieldType.LIST);
                List<?> list = (List<?>) value;
                for (Object element : list) {
                    FieldValue fieldValue = new FieldValue();
                    fieldValue.setValue(element.toString());
                    fieldValue.setField(field);
                    field.getFieldValues().add(fieldValue);
                }
                fields.add(field);
            } else {
                // If the value is a primitive type, save it as a FieldValue
                FieldValue fieldValue = new FieldValue();
                fieldValue.setValue(value.toString());
                fieldValue.setField(field);
                field.getFieldValues().add(fieldValue);
                field.setType(Field.FieldType.PRIMITIVE);
                fields.add(field);
            }
        });

        return fields;
    }
}
