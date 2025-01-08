package com.filegenie.backend.Controllers;

import com.filegenie.backend.Entities.FieldValue;
import com.filegenie.backend.Repositories.FieldRepository;
import com.filegenie.backend.Entities.Field;
import com.filegenie.backend.Services.FieldService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name = "Fields")
@RestController
@RequestMapping(path="/api/field")
public class FieldController {
    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private FieldService fieldService;


    @GetMapping(path="/all")
    public @ResponseBody Iterable<Field> getAllFields() {
        return fieldRepository.findAll();
    }

    @DeleteMapping(path="/all")
    public ResponseEntity<Void> deleteFields() {
        fieldService.deleteAllFields();
        return ResponseEntity.ok().build();
    }

    // Get root fields (fields without parents)
    @GetMapping("/root")
    public ResponseEntity<List<Field>> getRootFields() {
        return ResponseEntity.ok(fieldService.getRootFields());
    }

    // Get subfields of a specific field
    @GetMapping("/{fieldId}/subfields")
    public ResponseEntity<List<Field>> getSubFields(@PathVariable Long fieldId) {
        return ResponseEntity.ok(fieldService.getSubFields(fieldId));
    }

    // For testing (Adding and deleting)
    // Add a new field
    @PostMapping
    public ResponseEntity<Field> addField(@RequestBody Field field) {
        Field savedField = fieldService.addField(field);
        return ResponseEntity.ok(savedField);
    }
    // For testing (Adding and deleting)
    // Delete a field
    @DeleteMapping("/{fieldId}")
    public ResponseEntity<Void> deleteField(@PathVariable Long fieldId) {
        fieldService.deleteField(fieldId);
        return ResponseEntity.ok().build();
    }

    // Get field values for a specific field
    @GetMapping("/{fieldId}/values")
    public ResponseEntity<List<FieldValue>> getFieldValues(@PathVariable Long fieldId) {
        return ResponseEntity.ok(fieldService.getFieldValues(fieldId));
    }

    @GetMapping("/tree")
    public Map<String, Object> getFieldsHierarchy() {
        List<Field> rootFields = fieldService.getRootFields();
        List<Map<String, Object>> hierarchy = new ArrayList<>();

        for (Field field : rootFields) {
            hierarchy.add(castMap(field));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("fields", hierarchy);
        return response;
    }

    public Map<String, Object> castMap(Field field) {
        Map<String, Object> res = new HashMap<>();
        res.put("name", field.getName());
        res.put("type", field.getType());

        if (field.getFieldValues() != null) {
            List<String> values = new ArrayList<>();
            for (FieldValue value : field.getFieldValues()) {
                values.add(value.getValue());
            }
            res.put("values", values);
        }


        if (field.getSubFields() != null) {
            List<Map<String, Object>> subFields = new ArrayList<>();
            for (Field subField : field.getSubFields()) {
                subFields.add(castMap(subField));
            }
            res.put("children", subFields);
        }

        return res;
    }

    @PutMapping("/tree")
    public ResponseEntity<Void> updateFieldsTree(@RequestBody Map<String, Object> updatedTree) {
        fieldService.updateFieldsTree(updatedTree);
        return ResponseEntity.ok().build();
    }

}
