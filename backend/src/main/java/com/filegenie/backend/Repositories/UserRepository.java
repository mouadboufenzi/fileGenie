package com.filegenie.backend.Repositories;

import com.filegenie.backend.Entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmailAndUserIdNot(String email, Long userId);
}