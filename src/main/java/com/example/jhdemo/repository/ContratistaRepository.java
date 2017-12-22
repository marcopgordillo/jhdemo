package com.example.jhdemo.repository;

import com.example.jhdemo.domain.Contratista;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Contratista entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContratistaRepository extends JpaRepository<Contratista, Long> {

}
