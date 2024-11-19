package com.filegenie.backend.Repositories;

import com.filegenie.backend.Entities.FieldValue;
import org.springframework.data.repository.CrudRepository;

public interface ValueRepository extends CrudRepository<FieldValue, Integer> {}
