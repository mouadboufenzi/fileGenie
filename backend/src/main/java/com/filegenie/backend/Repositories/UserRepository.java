package com.filegenie.backend.Repositories;

import com.filegenie.backend.Entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

}