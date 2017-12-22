package com.example.jhdemo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.example.jhdemo.domain.Administrador;

import com.example.jhdemo.repository.AdministradorRepository;
import com.example.jhdemo.repository.search.AdministradorSearchRepository;
import com.example.jhdemo.web.rest.errors.BadRequestAlertException;
import com.example.jhdemo.web.rest.util.HeaderUtil;
import com.example.jhdemo.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Administrador.
 */
@RestController
@RequestMapping("/api")
public class AdministradorResource {

    private final Logger log = LoggerFactory.getLogger(AdministradorResource.class);

    private static final String ENTITY_NAME = "administrador";

    private final AdministradorRepository administradorRepository;

    private final AdministradorSearchRepository administradorSearchRepository;

    public AdministradorResource(AdministradorRepository administradorRepository, AdministradorSearchRepository administradorSearchRepository) {
        this.administradorRepository = administradorRepository;
        this.administradorSearchRepository = administradorSearchRepository;
    }

    /**
     * POST  /administradors : Create a new administrador.
     *
     * @param administrador the administrador to create
     * @return the ResponseEntity with status 201 (Created) and with body the new administrador, or with status 400 (Bad Request) if the administrador has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/administradors")
    @Timed
    public ResponseEntity<Administrador> createAdministrador(@Valid @RequestBody Administrador administrador) throws URISyntaxException {
        log.debug("REST request to save Administrador : {}", administrador);
        if (administrador.getId() != null) {
            throw new BadRequestAlertException("A new administrador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Administrador result = administradorRepository.save(administrador);
        administradorSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/administradors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /administradors : Updates an existing administrador.
     *
     * @param administrador the administrador to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated administrador,
     * or with status 400 (Bad Request) if the administrador is not valid,
     * or with status 500 (Internal Server Error) if the administrador couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/administradors")
    @Timed
    public ResponseEntity<Administrador> updateAdministrador(@Valid @RequestBody Administrador administrador) throws URISyntaxException {
        log.debug("REST request to update Administrador : {}", administrador);
        if (administrador.getId() == null) {
            return createAdministrador(administrador);
        }
        Administrador result = administradorRepository.save(administrador);
        administradorSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, administrador.getId().toString()))
            .body(result);
    }

    /**
     * GET  /administradors : get all the administradors.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of administradors in body
     */
    @GetMapping("/administradors")
    @Timed
    public ResponseEntity<List<Administrador>> getAllAdministradors(Pageable pageable) {
        log.debug("REST request to get a page of Administradors");
        Page<Administrador> page = administradorRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/administradors");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /administradors/:id : get the "id" administrador.
     *
     * @param id the id of the administrador to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the administrador, or with status 404 (Not Found)
     */
    @GetMapping("/administradors/{id}")
    @Timed
    public ResponseEntity<Administrador> getAdministrador(@PathVariable Long id) {
        log.debug("REST request to get Administrador : {}", id);
        Administrador administrador = administradorRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(administrador));
    }

    /**
     * DELETE  /administradors/:id : delete the "id" administrador.
     *
     * @param id the id of the administrador to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/administradors/{id}")
    @Timed
    public ResponseEntity<Void> deleteAdministrador(@PathVariable Long id) {
        log.debug("REST request to delete Administrador : {}", id);
        administradorRepository.delete(id);
        administradorSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/administradors?query=:query : search for the administrador corresponding
     * to the query.
     *
     * @param query the query of the administrador search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/administradors")
    @Timed
    public ResponseEntity<List<Administrador>> searchAdministradors(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Administradors for query {}", query);
        Page<Administrador> page = administradorSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/administradors");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
