package com.example.jhdemo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.example.jhdemo.domain.Garantia;

import com.example.jhdemo.repository.GarantiaRepository;
import com.example.jhdemo.repository.search.GarantiaSearchRepository;
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
 * REST controller for managing Garantia.
 */
@RestController
@RequestMapping("/api")
public class GarantiaResource {

    private final Logger log = LoggerFactory.getLogger(GarantiaResource.class);

    private static final String ENTITY_NAME = "garantia";

    private final GarantiaRepository garantiaRepository;

    private final GarantiaSearchRepository garantiaSearchRepository;

    public GarantiaResource(GarantiaRepository garantiaRepository, GarantiaSearchRepository garantiaSearchRepository) {
        this.garantiaRepository = garantiaRepository;
        this.garantiaSearchRepository = garantiaSearchRepository;
    }

    /**
     * POST  /garantias : Create a new garantia.
     *
     * @param garantia the garantia to create
     * @return the ResponseEntity with status 201 (Created) and with body the new garantia, or with status 400 (Bad Request) if the garantia has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/garantias")
    @Timed
    public ResponseEntity<Garantia> createGarantia(@Valid @RequestBody Garantia garantia) throws URISyntaxException {
        log.debug("REST request to save Garantia : {}", garantia);
        if (garantia.getId() != null) {
            throw new BadRequestAlertException("A new garantia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Garantia result = garantiaRepository.save(garantia);
        garantiaSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/garantias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /garantias : Updates an existing garantia.
     *
     * @param garantia the garantia to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated garantia,
     * or with status 400 (Bad Request) if the garantia is not valid,
     * or with status 500 (Internal Server Error) if the garantia couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/garantias")
    @Timed
    public ResponseEntity<Garantia> updateGarantia(@Valid @RequestBody Garantia garantia) throws URISyntaxException {
        log.debug("REST request to update Garantia : {}", garantia);
        if (garantia.getId() == null) {
            return createGarantia(garantia);
        }
        Garantia result = garantiaRepository.save(garantia);
        garantiaSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, garantia.getId().toString()))
            .body(result);
    }

    /**
     * GET  /garantias : get all the garantias.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of garantias in body
     */
    @GetMapping("/garantias")
    @Timed
    public ResponseEntity<List<Garantia>> getAllGarantias(Pageable pageable) {
        log.debug("REST request to get a page of Garantias");
        Page<Garantia> page = garantiaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/garantias");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /garantias/:id : get the "id" garantia.
     *
     * @param id the id of the garantia to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the garantia, or with status 404 (Not Found)
     */
    @GetMapping("/garantias/{id}")
    @Timed
    public ResponseEntity<Garantia> getGarantia(@PathVariable Long id) {
        log.debug("REST request to get Garantia : {}", id);
        Garantia garantia = garantiaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(garantia));
    }

    /**
     * DELETE  /garantias/:id : delete the "id" garantia.
     *
     * @param id the id of the garantia to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/garantias/{id}")
    @Timed
    public ResponseEntity<Void> deleteGarantia(@PathVariable Long id) {
        log.debug("REST request to delete Garantia : {}", id);
        garantiaRepository.delete(id);
        garantiaSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/garantias?query=:query : search for the garantia corresponding
     * to the query.
     *
     * @param query the query of the garantia search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/garantias")
    @Timed
    public ResponseEntity<List<Garantia>> searchGarantias(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Garantias for query {}", query);
        Page<Garantia> page = garantiaSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/garantias");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
