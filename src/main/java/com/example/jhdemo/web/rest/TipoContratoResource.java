package com.example.jhdemo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.example.jhdemo.domain.TipoContrato;

import com.example.jhdemo.repository.TipoContratoRepository;
import com.example.jhdemo.repository.search.TipoContratoSearchRepository;
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
 * REST controller for managing TipoContrato.
 */
@RestController
@RequestMapping("/api")
public class TipoContratoResource {

    private final Logger log = LoggerFactory.getLogger(TipoContratoResource.class);

    private static final String ENTITY_NAME = "tipoContrato";

    private final TipoContratoRepository tipoContratoRepository;

    private final TipoContratoSearchRepository tipoContratoSearchRepository;

    public TipoContratoResource(TipoContratoRepository tipoContratoRepository, TipoContratoSearchRepository tipoContratoSearchRepository) {
        this.tipoContratoRepository = tipoContratoRepository;
        this.tipoContratoSearchRepository = tipoContratoSearchRepository;
    }

    /**
     * POST  /tipo-contratoes : Create a new tipoContrato.
     *
     * @param tipoContrato the tipoContrato to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoContrato, or with status 400 (Bad Request) if the tipoContrato has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-contratoes")
    @Timed
    public ResponseEntity<TipoContrato> createTipoContrato(@Valid @RequestBody TipoContrato tipoContrato) throws URISyntaxException {
        log.debug("REST request to save TipoContrato : {}", tipoContrato);
        if (tipoContrato.getId() != null) {
            throw new BadRequestAlertException("A new tipoContrato cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoContrato result = tipoContratoRepository.save(tipoContrato);
        tipoContratoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/tipo-contratoes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-contratoes : Updates an existing tipoContrato.
     *
     * @param tipoContrato the tipoContrato to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoContrato,
     * or with status 400 (Bad Request) if the tipoContrato is not valid,
     * or with status 500 (Internal Server Error) if the tipoContrato couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-contratoes")
    @Timed
    public ResponseEntity<TipoContrato> updateTipoContrato(@Valid @RequestBody TipoContrato tipoContrato) throws URISyntaxException {
        log.debug("REST request to update TipoContrato : {}", tipoContrato);
        if (tipoContrato.getId() == null) {
            return createTipoContrato(tipoContrato);
        }
        TipoContrato result = tipoContratoRepository.save(tipoContrato);
        tipoContratoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoContrato.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-contratoes : get all the tipoContratoes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipoContratoes in body
     */
    @GetMapping("/tipo-contratoes")
    @Timed
    public List<TipoContrato> getAllTipoContratoes() {
        log.debug("REST request to get all TipoContratoes");
        return tipoContratoRepository.findAll();
        }

    /**
     * GET  /tipo-contratoes/:id : get the "id" tipoContrato.
     *
     * @param id the id of the tipoContrato to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoContrato, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-contratoes/{id}")
    @Timed
    public ResponseEntity<TipoContrato> getTipoContrato(@PathVariable Long id) {
        log.debug("REST request to get TipoContrato : {}", id);
        TipoContrato tipoContrato = tipoContratoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tipoContrato));
    }

    /**
     * DELETE  /tipo-contratoes/:id : delete the "id" tipoContrato.
     *
     * @param id the id of the tipoContrato to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-contratoes/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipoContrato(@PathVariable Long id) {
        log.debug("REST request to delete TipoContrato : {}", id);
        tipoContratoRepository.delete(id);
        tipoContratoSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/tipo-contratoes?query=:query : search for the tipoContrato corresponding
     * to the query.
     *
     * @param query the query of the tipoContrato search
     * @return the result of the search
     */
    @GetMapping("/_search/tipo-contratoes")
    @Timed
    public List<TipoContrato> searchTipoContratoes(@RequestParam String query) {
        log.debug("REST request to search TipoContratoes for query {}", query);
        return StreamSupport
            .stream(tipoContratoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
