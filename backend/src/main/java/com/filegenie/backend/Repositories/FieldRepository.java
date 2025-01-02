package com.filegenie.backend.Repositories;

import com.filegenie.backend.Entities.Field;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface FieldRepository extends JpaRepository<Field, Long> {

    Optional<Field> findByName(String name);

    List<Field> findByParentFieldIsNull();

    List<Field> findByParentField_FieldId(Long fieldId);


}