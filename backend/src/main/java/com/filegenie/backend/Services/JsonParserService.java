package com.filegenie.backend.Services;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.filegenie.backend.DTO.HttpException;
import com.filegenie.backend.Entities.Field;
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
                field.setValue(null); // Pas de valeur directe
                fields.add(field);
                fields.addAll(processNode(field, entry.getValue()));
            } else {
                field.setValue(entry.getValue().asText());
                fields.add(field);
            }
        });

        return fields;
    }
}
