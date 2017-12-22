package com.example.jhdemo.repository;

import com.example.jhdemo.domain.Administrador;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Administrador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {

}
