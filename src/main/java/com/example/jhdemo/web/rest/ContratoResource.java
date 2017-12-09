package com.example.jhdemo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.example.jhdemo.domain.Contrato;

import com.example.jhdemo.repository.ContratoRepository;
import com.example.jhdemo.repository.search.ContratoSearchRepository;
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
 * REST controller for managing Contrato.
 */
@RestController
@RequestMapping("/api")
public class ContratoResource {

    private final Logger log = LoggerFactory.getLogger(ContratoResource.class);

    private static final String ENTITY_NAME = "contrato";

    private final ContratoRepository contratoRepository;

    private final ContratoSearchRepository contratoSearchRepository;

    public ContratoResource(ContratoRepository contratoRepository, ContratoSearchRepository contratoSearchRepository) {
        this.contratoRepository = contratoRepository;
        this.contratoSearchRepository = contratoSearchRepository;
    }

    /**
     * POST  /contratoes : Create a new contrato.
     *
     * @param contrato the contrato to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contrato, or with status 400 (Bad Request) if the contrato has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contratoes")
    @Timed
    public ResponseEntity<Contrato> createContrato(@Valid @RequestBody Contrato contrato) throws URISyntaxException {
        log.debug("REST request to save Contrato : {}", contrato);
        if (contrato.getId() != null) {
            throw new BadRequestAlertException("A new contrato cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Contrato result = contratoRepository.save(contrato);
        contratoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/contratoes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contratoes : Updates an existing contrato.
     *
     * @param contrato the contrato to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contrato,
     * or with status 400 (Bad Request) if the contrato is not valid,
     * or with status 500 (Internal Server Error) if the contrato couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contratoes")
    @Timed
    public ResponseEntity<Contrato> updateContrato(@Valid @RequestBody Contrato contrato) throws URISyntaxException {
        log.debug("REST request to update Contrato : {}", contrato);
        if (contrato.getId() == null) {
            return createContrato(contrato);
        }
        Contrato result = contratoRepository.save(contrato);
        contratoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contrato.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contratoes : get all the contratoes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of contratoes in body
     */
    @GetMapping("/contratoes")
    @Timed
    public ResponseEntity<List<Contrato>> getAllContratoes(Pageable pageable) {
        log.debug("REST request to get a page of Contratoes");
        Page<Contrato> page = contratoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/contratoes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /contratoes/:id : get the "id" contrato.
     *
     * @param id the id of the contrato to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contrato, or with status 404 (Not Found)
     */
    @GetMapping("/contratoes/{id}")
    @Timed
    public ResponseEntity<Contrato> getContrato(@PathVariable Long id) {
        log.debug("REST request to get Contrato : {}", id);
        Contrato contrato = contratoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(contrato));
    }

    /**
     * DELETE  /contratoes/:id : delete the "id" contrato.
     *
     * @param id the id of the contrato to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contratoes/{id}")
    @Timed
    public ResponseEntity<Void> deleteContrato(@PathVariable Long id) {
        log.debug("REST request to delete Contrato : {}", id);
        contratoRepository.delete(id);
        contratoSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/contratoes?query=:query : search for the contrato corresponding
     * to the query.
     *
     * @param query the query of the contrato search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/contratoes")
    @Timed
    public ResponseEntity<List<Contrato>> searchContratoes(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Contratoes for query {}", query);
        Page<Contrato> page = contratoSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/contratoes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
