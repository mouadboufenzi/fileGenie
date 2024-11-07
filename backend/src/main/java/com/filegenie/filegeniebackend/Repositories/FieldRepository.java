package com.filegenie.filegeniebackend.Repositories;

import com.filegenie.filegeniebackend.Entities.Field;
import org.springframework.data.repository.CrudRepository;

public interface FieldRepository extends CrudRepository<Field, Integer> {
    
}