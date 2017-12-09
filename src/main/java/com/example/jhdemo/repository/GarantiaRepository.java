package com.example.jhdemo.repository;

import com.example.jhdemo.domain.Garantia;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Garantia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GarantiaRepository extends JpaRepository<Garantia, Long> {

}
