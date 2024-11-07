package com.filegenie.backend.Repositories;

import com.filegenie.backend.Entities.Field;
import org.springframework.data.repository.CrudRepository;

public interface FieldRepository extends CrudRepository<Field, Integer> {
    
}