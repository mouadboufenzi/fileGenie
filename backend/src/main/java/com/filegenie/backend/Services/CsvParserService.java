package com.filegenie.backend.Services;

import com.filegenie.backend.DTO.HttpException;
import com.filegenie.backend.Entities.Field;
import com.filegenie.backend.Entities.FieldValue;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvParserService {

    public List<Field> parseCsvToFields(File csvFile) throws HttpException {
        if (csvFile == null || !csvFile.exists() || !csvFile.isFile()) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Le fichier CSV fourni est invalide ou inexistant.");
        }

        List<Field> fields = new ArrayList<>();

        try (FileReader reader = new FileReader(csvFile);
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {

            List<String> headers = csvParser.getHeaderNames();
            for (String header : headers) {
                Field field = new Field();
                field.setName(header);
                field.setType("VALUE");
                fields.add(field);
            }

            // Vérifie si chaque ligne a le nombre correct de colonnes
            for (CSVRecord record : csvParser) {
                if (record.size() != headers.size()) {
                    throw new HttpException(
                            HttpStatus.BAD_REQUEST,
                            "Le fichier CSV contient des lignes avec un nombre de colonnes différent du nombre d'en-têtes."
                    );
                }

                for (Field field : fields) {
                    String value = record.get(field.getName());
                    if (value != null) {
                        FieldValue fieldValue = new FieldValue();
                        fieldValue.setField(field);
                        fieldValue.setValue(value);
                        field.getFieldValues().add(fieldValue);
                    }
                }
            }

        } catch (HttpException e) {
            throw e;
        } catch (Exception e) {
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Impossible de parser le fichier CSV: " + e.getMessage());
        }

        return fields;
    }
}
