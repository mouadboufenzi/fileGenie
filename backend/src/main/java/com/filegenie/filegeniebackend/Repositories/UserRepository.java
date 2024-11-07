package com.filegenie.filegeniebackend.Repositories;

import com.filegenie.filegeniebackend.Entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

}