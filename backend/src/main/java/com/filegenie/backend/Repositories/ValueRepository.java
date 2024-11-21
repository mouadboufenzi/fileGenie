package com.filegenie.backend.Repositories;
import com.filegenie.backend.Entities.Value;
import org.springframework.data.repository.CrudRepository;
public interface ValueRepository extends CrudRepository<Value, Integer> {}