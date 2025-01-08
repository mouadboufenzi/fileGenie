package com.filegenie.backend.Controllers;

import com.filegenie.backend.Entities.Field;
import com.filegenie.backend.Entities.FieldValue;
import com.filegenie.backend.Repositories.FieldValueRepository;
import com.filegenie.backend.Services.FieldService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name = "Fields Values")
@RestController
@RequestMapping(path="/api/fieldValue")
public class FieldValueController {
    @Autowired
    private FieldValueRepository fieldValueRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<FieldValue> getAllFields() {
        return fieldValueRepository.findAll();
    }

}
