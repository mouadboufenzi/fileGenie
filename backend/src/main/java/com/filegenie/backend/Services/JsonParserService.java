package com.filegenie.backend.Services;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.filegenie.backend.Entities.Field;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class JsonParserService {

    public List<Field> parseJsonToFields(File jsonFile) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(jsonFile);
        return processNode(null, rootNode);
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
