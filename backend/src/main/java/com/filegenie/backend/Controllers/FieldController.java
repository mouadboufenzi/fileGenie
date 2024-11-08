package com.filegenie.backend.Controllers;

import com.filegenie.backend.Repositories.FieldRepository;
import com.filegenie.backend.Entities.Field;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Fields")
@RestController
@RequestMapping(path="/api/field")
public class FieldController {
    @Autowired
    private FieldRepository fieldRepository;

    @PostMapping(path="/create")
    public @ResponseBody Long addNewField (
            @RequestParam String name,
            @RequestParam String value
    ) {
        Field f = new Field();
        f.setName(name);
        f.setValue(value);

        return f.getId();
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Field> getAllFields() {
        return fieldRepository.findAll();
    }
}