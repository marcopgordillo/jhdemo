package com.example.jhdemo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.example.jhdemo.domain.Contratista;

import com.example.jhdemo.repository.ContratistaRepository;
import com.example.jhdemo.repository.search.ContratistaSearchRepository;
import com.example.jhdemo.web.rest.errors.BadRequestAlertException;
import com.example.jhdemo.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 * REST controller for managing Contratista.
 */
@RestController
@RequestMapping("/api")
public class ContratistaResource {

    private final Logger log = LoggerFactory.getLogger(ContratistaResource.class);

    private static final String ENTITY_NAME = "contratista";

    private final ContratistaRepository contratistaRepository;

    private final ContratistaSearchRepository contratistaSearchRepository;

    public ContratistaResource(ContratistaRepository contratistaRepository, ContratistaSearchRepository contratistaSearchRepository) {
        this.contratistaRepository = contratistaRepository;
        this.contratistaSearchRepository = contratistaSearchRepository;
    }

    /**
     * POST  /contratistas : Create a new contratista.
     *
     * @param contratista the contratista to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contratista, or with status 400 (Bad Request) if the contratista has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contratistas")
    @Timed
    public ResponseEntity<Contratista> createContratista(@Valid @RequestBody Contratista contratista) throws URISyntaxException {
        log.debug("REST request to save Contratista : {}", contratista);
        if (contratista.getId() != null) {
            throw new BadRequestAlertException("A new contratista cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Contratista result = contratistaRepository.save(contratista);
        contratistaSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/contratistas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contratistas : Updates an existing contratista.
     *
     * @param contratista the contratista to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contratista,
     * or with status 400 (Bad Request) if the contratista is not valid,
     * or with status 500 (Internal Server Error) if the contratista couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contratistas")
    @Timed
    public ResponseEntity<Contratista> updateContratista(@Valid @RequestBody Contratista contratista) throws URISyntaxException {
        log.debug("REST request to update Contratista : {}", contratista);
        if (contratista.getId() == null) {
            return createContratista(contratista);
        }
        Contratista result = contratistaRepository.save(contratista);
        contratistaSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contratista.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contratistas : get all the contratistas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contratistas in body
     */
    @GetMapping("/contratistas")
    @Timed
    public List<Contratista> getAllContratistas() {
        log.debug("REST request to get all Contratistas");
        return contratistaRepository.findAll();
        }

    /**
     * GET  /contratistas/:id : get the "id" contratista.
     *
     * @param id the id of the contratista to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contratista, or with status 404 (Not Found)
     */
    @GetMapping("/contratistas/{id}")
    @Timed
    public ResponseEntity<Contratista> getContratista(@PathVariable Long id) {
        log.debug("REST request to get Contratista : {}", id);
        Contratista contratista = contratistaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(contratista));
    }

    /**
     * DELETE  /contratistas/:id : delete the "id" contratista.
     *
     * @param id the id of the contratista to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contratistas/{id}")
    @Timed
    public ResponseEntity<Void> deleteContratista(@PathVariable Long id) {
        log.debug("REST request to delete Contratista : {}", id);
        contratistaRepository.delete(id);
        contratistaSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/contratistas?query=:query : search for the contratista corresponding
     * to the query.
     *
     * @param query the query of the contratista search
     * @return the result of the search
     */
    @GetMapping("/_search/contratistas")
    @Timed
    public List<Contratista> searchContratistas(@RequestParam String query) {
        log.debug("REST request to search Contratistas for query {}", query);
        return StreamSupport
            .stream(contratistaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
