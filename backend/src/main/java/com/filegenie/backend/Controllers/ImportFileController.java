package com.filegenie.backend.Controllers;

import com.filegenie.backend.DTO.HttpException;
import com.filegenie.backend.Entities.Field;
import com.filegenie.backend.Services.JsonParserService;
import com.filegenie.backend.Services.RegisterJsonFieldService;
import com.filegenie.backend.Services.RegisterXmlFieldService;
import com.filegenie.backend.Services.XmlParserService;
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
    private RegisterJsonFieldService registerJsonFieldService;

    @Autowired
    private XmlParserService xmlParserService;

    @Autowired
    private RegisterXmlFieldService registerXmlFieldService;

    @PostMapping(path = "/")
    public ResponseEntity<?> addNewField(
            @RequestParam("file") MultipartFile file,
            @RequestHeader("Authorization") String token) {

        try {
            // Vérification du nom du fichier
            String fileName = file.getOriginalFilename();
            if (fileName == null || !fileName.contains(".")) {
                throw new IllegalArgumentException("Nom de fichier invalide ou sans extension.");
            }

            String extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();

            switch (extension) {
                case "json": {
                    handleJsonFile(file);
                    break;
                }
                case "xml": {
                    handleXmlFile(file);
                    break;
                }
                default: {
                    throw new UnsupportedOperationException("Extension non prise en charge : " + extension);
                }
            }

        } catch (Exception e) {
            String customMessage = "Erreur lors de l'enregistrement des champs : " + e.getMessage();
            System.err.println(customMessage);
            e.printStackTrace();
            return new ResponseEntity<>(customMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // Méthode utilitaire pour gérer les fichiers JSON
    private void handleJsonFile(MultipartFile file) throws Exception {
        File tempFile = File.createTempFile("uploaded-", ".json");
        try {
            file.transferTo(tempFile);
            List<Field> fields = jsonParserService.parseJsonToFields(tempFile);
            System.out.println(fields);
            registerJsonFieldService.saveJsonFields(fields);
        } finally {
            if (!tempFile.delete()) {
                System.err.println("Le fichier temporaire JSON n'a pas pu être supprimé : " + tempFile.getAbsolutePath());
            }
        }
    }

    // Méthode utilitaire pour gérer les fichiers XML
    private void handleXmlFile(MultipartFile file) throws Exception {
        File tempFile = File.createTempFile("uploaded-", ".xml");
        try {
            file.transferTo(tempFile);
            List<Field> fields = xmlParserService.parseXmlToFields(tempFile);
            System.out.println(fields);
            registerXmlFieldService.saveXmlFields(fields);
        } finally {
            if (!tempFile.delete()) {
                System.err.println("Le fichier temporaire XML n'a pas pu être supprimé : " + tempFile.getAbsolutePath());
            }
        }
    }
}
