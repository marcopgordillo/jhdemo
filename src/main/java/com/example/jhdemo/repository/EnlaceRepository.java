package com.example.jhdemo.repository;

import com.example.jhdemo.domain.Enlace;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Enlace entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EnlaceRepository extends JpaRepository<Enlace, Long> {

}
