package com.filegenie.backend.Services;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.filegenie.backend.DTO.HttpException;
import com.filegenie.backend.Entities.Field;
import com.filegenie.backend.Entities.FieldValue;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class JsonParserService {

        public List<Field> parseJsonToFields(File jsonFile) throws HttpException {

            if (jsonFile == null || !jsonFile.exists() || !jsonFile.isFile()) {
                throw new HttpException(HttpStatus.BAD_REQUEST, "Le fichier JSON fourni est invalide ou inexistant.");
            }

            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(jsonFile);
                return processNode(null, rootNode);
            } catch (Exception e) {
                throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Impossible de parser le fichier JSON: " + e.getMessage());
            }
        }

        private List<Field> processNode(Field parent, JsonNode node) {
            List<Field> fields = new ArrayList<>();

            node.fields().forEachRemaining(entry -> {
                Field field = new Field();
                field.setName(entry.getKey());
                field.setParentField(parent);

                if (entry.getValue().isObject()) {
                    // Si la valeur est un objet, ce champ contient des sous-champs
                    fields.add(field);
                    fields.addAll(processNode(field, entry.getValue()));
                } else if (entry.getValue().isArray()) {
                    // Si la valeur est un tableau, on ajoute chaque élément comme FieldValue
                    entry.getValue().forEach(arrayElement -> {
                        FieldValue fieldValue = new FieldValue();
                        fieldValue.setValue(arrayElement.asText());
                        fieldValue.setField(field); // Associer ce FieldValue au Field parent
                        field.getFieldValues().add(fieldValue);
                    });
                    fields.add(field);
                } else {
                    // Si la valeur est une chaîne simple
                    FieldValue fieldValue = new FieldValue();
                    fieldValue.setValue(entry.getValue().asText());
                    fieldValue.setField(field);
                    field.getFieldValues().add(fieldValue);
                    fields.add(field);
                }
            });

            return fields;
        }
    }

