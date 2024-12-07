package com.filegenie.backend.Services;

import com.filegenie.backend.DTO.HttpException;
import com.filegenie.backend.Entities.Field;
import com.filegenie.backend.Entities.FieldValue;
import com.filegenie.backend.Repositories.FieldRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.w3c.dom.*;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class XmlParserService {


        private final FieldRepository fieldRepository;

        public XmlParserService(FieldRepository fieldRepository) {
            this.fieldRepository = fieldRepository;
        }

        public List<Field> parseXmlToFields(File xmlFile) throws HttpException {

            if (xmlFile == null || !xmlFile.exists() || !xmlFile.isFile()) {
                throw new HttpException(HttpStatus.BAD_REQUEST, "Le fichier XML fourni est invalide ou inexistant.");
            }

            try {
                DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                DocumentBuilder builder = factory.newDocumentBuilder();
                Document document = builder.parse(xmlFile);
                Element rootElement = document.getDocumentElement();

                return processNode(null, rootElement);
            } catch (Exception e) {
                throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Impossible de parser le fichier XML: " + e.getMessage());
            }
        }

    private List<Field> processNode(Field parent, Node node) {
        List<Field> fields = new ArrayList<>();

        // Vérifier si le champ existe déjà dans la base de données
        Optional<Field> optionalField = fieldRepository.findByName(node.getNodeName());
        Field field;

        if (optionalField.isPresent()) {
            // Si le champ existe déjà, on l'utilise
            field = optionalField.get();
        } else {
            // Si le champ n'existe pas, le créer et le sauvegarder
            field = new Field();
            field.setName(node.getNodeName());
            field.setParentField(parent);
            fieldRepository.save(field);
        }

        // Si le nœud contient du texte simple
        if (node.getNodeType() == Node.ELEMENT_NODE && node.getChildNodes().getLength() == 1
                && node.getFirstChild().getNodeType() == Node.TEXT_NODE) {

            String value = node.getTextContent().trim();

            // Vérifier si la valeur existe déjà pour ce champ
            boolean valueExists = field.getFieldValues().stream()
                    .anyMatch(fieldValue -> fieldValue.getValue().equals(value));

            if (!valueExists) {
                // Si la valeur n'existe pas déjà, on l'ajoute
                FieldValue fieldValue = new FieldValue();
                fieldValue.setValue(value);
                fieldValue.setField(field);
                field.getFieldValues().add(fieldValue);
            }

            fields.add(field);
            return fields;
        }

        // Parcourir les enfants de ce nœud
        NodeList childNodes = node.getChildNodes();
        for (int i = 0; i < childNodes.getLength(); i++) {
            Node child = childNodes.item(i);

            if (child.getNodeType() == Node.ELEMENT_NODE) {
                fields.addAll(processNode(field, child));
            }
        }

        // Ajouter le champ courant s'il contient des sous-champs
        fields.add(field);
        return fields;
    }



}
