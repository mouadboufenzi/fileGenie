package com.filegenie.backend.Services;

import com.filegenie.backend.Entities.Field;
import com.filegenie.backend.Repositories.FieldRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegisterFieldService {

    @Autowired
    private FieldRepository fieldRepository;

    public void saveFields(List<Field> fields) {
        fieldRepository.saveAll(fields);
    }

}
