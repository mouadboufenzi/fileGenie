package com.filegenie.backend.Repositories;

import com.filegenie.backend.Entities.FieldValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FieldValueRepository extends JpaRepository<FieldValue, Long> {
    List<FieldValue> findByField_FieldId(Long fieldId);
}
