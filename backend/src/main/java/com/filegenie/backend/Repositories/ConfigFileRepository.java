package com.filegenie.backend.Repositories;



import com.filegenie.backend.Entities.ConfigurationFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ConfigFileRepository extends JpaRepository<ConfigurationFile, Long> {
    @Query("SELECT cf FROM ConfigurationFile cf JOIN cf.users u WHERE u.userId = :userId")
    List<ConfigurationFile> findAllByUserId(@Param("userId") Long userId);
}
