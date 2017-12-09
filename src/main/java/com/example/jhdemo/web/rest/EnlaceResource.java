package com.example.jhdemo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.example.jhdemo.domain.Enlace;

import com.example.jhdemo.repository.EnlaceRepository;
import com.example.jhdemo.repository.search.EnlaceSearchRepository;
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
 * REST controller for managing Enlace.
 */
@RestController
@RequestMapping("/api")
public class EnlaceResource {

    private final Logger log = LoggerFactory.getLogger(EnlaceResource.class);

    private static final String ENTITY_NAME = "enlace";

    private final EnlaceRepository enlaceRepository;

    private final EnlaceSearchRepository enlaceSearchRepository;

    public EnlaceResource(EnlaceRepository enlaceRepository, EnlaceSearchRepository enlaceSearchRepository) {
        this.enlaceRepository = enlaceRepository;
        this.enlaceSearchRepository = enlaceSearchRepository;
    }

    /**
     * POST  /enlaces : Create a new enlace.
     *
     * @param enlace the enlace to create
     * @return the ResponseEntity with status 201 (Created) and with body the new enlace, or with status 400 (Bad Request) if the enlace has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/enlaces")
    @Timed
    public ResponseEntity<Enlace> createEnlace(@Valid @RequestBody Enlace enlace) throws URISyntaxException {
        log.debug("REST request to save Enlace : {}", enlace);
        if (enlace.getId() != null) {
            throw new BadRequestAlertException("A new enlace cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Enlace result = enlaceRepository.save(enlace);
        enlaceSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/enlaces/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /enlaces : Updates an existing enlace.
     *
     * @param enlace the enlace to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated enlace,
     * or with status 400 (Bad Request) if the enlace is not valid,
     * or with status 500 (Internal Server Error) if the enlace couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/enlaces")
    @Timed
    public ResponseEntity<Enlace> updateEnlace(@Valid @RequestBody Enlace enlace) throws URISyntaxException {
        log.debug("REST request to update Enlace : {}", enlace);
        if (enlace.getId() == null) {
            return createEnlace(enlace);
        }
        Enlace result = enlaceRepository.save(enlace);
        enlaceSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, enlace.getId().toString()))
            .body(result);
    }

    /**
     * GET  /enlaces : get all the enlaces.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of enlaces in body
     */
    @GetMapping("/enlaces")
    @Timed
    public List<Enlace> getAllEnlaces() {
        log.debug("REST request to get all Enlaces");
        return enlaceRepository.findAll();
        }

    /**
     * GET  /enlaces/:id : get the "id" enlace.
     *
     * @param id the id of the enlace to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the enlace, or with status 404 (Not Found)
     */
    @GetMapping("/enlaces/{id}")
    @Timed
    public ResponseEntity<Enlace> getEnlace(@PathVariable Long id) {
        log.debug("REST request to get Enlace : {}", id);
        Enlace enlace = enlaceRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(enlace));
    }

    /**
     * DELETE  /enlaces/:id : delete the "id" enlace.
     *
     * @param id the id of the enlace to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/enlaces/{id}")
    @Timed
    public ResponseEntity<Void> deleteEnlace(@PathVariable Long id) {
        log.debug("REST request to delete Enlace : {}", id);
        enlaceRepository.delete(id);
        enlaceSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/enlaces?query=:query : search for the enlace corresponding
     * to the query.
     *
     * @param query the query of the enlace search
     * @return the result of the search
     */
    @GetMapping("/_search/enlaces")
    @Timed
    public List<Enlace> searchEnlaces(@RequestParam String query) {
        log.debug("REST request to search Enlaces for query {}", query);
        return StreamSupport
            .stream(enlaceSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
