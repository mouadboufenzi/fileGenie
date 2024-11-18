package com.filegenie.backend.Controllers;

import com.filegenie.backend.Entities.Field;
import com.filegenie.backend.Services.JsonParserService;
import com.filegenie.backend.Services.RegisterFieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Controller
@RestController
@RequestMapping("/api/file/import")
public class ImportFileController {

    @Autowired
    private JsonParserService jsonParserService;

    @Autowired
    private RegisterFieldService registerFieldService;

    @PostMapping(path = "/")
    public ResponseEntity<HttpStatus> AddNewField(
            @RequestParam("file") MultipartFile file,
            @RequestHeader("Authorization") String token) {

        try {

            File tempFile = File.createTempFile("uploaded-", ".json");
            file.transferTo(tempFile);
            List<Field> list = jsonParserService.parseJsonToFields(tempFile);
            System.out.println(list);
            registerFieldService.saveFields(list);
            tempFile.delete();

        } catch (Exception e) {
            String customMessage = "Erreur lors de l'enregistrement des champs : " + e.getMessage();
            System.err.println(customMessage);
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
