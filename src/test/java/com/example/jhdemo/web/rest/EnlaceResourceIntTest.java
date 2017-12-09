package com.example.jhdemo.web.rest;

import com.example.jhdemo.JhdemoApp;

import com.example.jhdemo.domain.Enlace;
import com.example.jhdemo.repository.EnlaceRepository;
import com.example.jhdemo.repository.search.EnlaceSearchRepository;
import com.example.jhdemo.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.example.jhdemo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EnlaceResource REST controller.
 *
 * @see EnlaceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhdemoApp.class)
public class EnlaceResourceIntTest {

    private static final String DEFAULT_ENLACE = "AAAAAAAAAA";
    private static final String UPDATED_ENLACE = "BBBBBBBBBB";

    private static final Integer DEFAULT_YEAR = 1;
    private static final Integer UPDATED_YEAR = 2;

    @Autowired
    private EnlaceRepository enlaceRepository;

    @Autowired
    private EnlaceSearchRepository enlaceSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEnlaceMockMvc;

    private Enlace enlace;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EnlaceResource enlaceResource = new EnlaceResource(enlaceRepository, enlaceSearchRepository);
        this.restEnlaceMockMvc = MockMvcBuilders.standaloneSetup(enlaceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Enlace createEntity(EntityManager em) {
        Enlace enlace = new Enlace()
            .enlace(DEFAULT_ENLACE)
            .year(DEFAULT_YEAR);
        return enlace;
    }

    @Before
    public void initTest() {
        enlaceSearchRepository.deleteAll();
        enlace = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnlace() throws Exception {
        int databaseSizeBeforeCreate = enlaceRepository.findAll().size();

        // Create the Enlace
        restEnlaceMockMvc.perform(post("/api/enlaces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enlace)))
            .andExpect(status().isCreated());

        // Validate the Enlace in the database
        List<Enlace> enlaceList = enlaceRepository.findAll();
        assertThat(enlaceList).hasSize(databaseSizeBeforeCreate + 1);
        Enlace testEnlace = enlaceList.get(enlaceList.size() - 1);
        assertThat(testEnlace.getEnlace()).isEqualTo(DEFAULT_ENLACE);
        assertThat(testEnlace.getYear()).isEqualTo(DEFAULT_YEAR);

        // Validate the Enlace in Elasticsearch
        Enlace enlaceEs = enlaceSearchRepository.findOne(testEnlace.getId());
        assertThat(enlaceEs).isEqualToIgnoringGivenFields(testEnlace);
    }

    @Test
    @Transactional
    public void createEnlaceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enlaceRepository.findAll().size();

        // Create the Enlace with an existing ID
        enlace.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnlaceMockMvc.perform(post("/api/enlaces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enlace)))
            .andExpect(status().isBadRequest());

        // Validate the Enlace in the database
        List<Enlace> enlaceList = enlaceRepository.findAll();
        assertThat(enlaceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkEnlaceIsRequired() throws Exception {
        int databaseSizeBeforeTest = enlaceRepository.findAll().size();
        // set the field null
        enlace.setEnlace(null);

        // Create the Enlace, which fails.

        restEnlaceMockMvc.perform(post("/api/enlaces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enlace)))
            .andExpect(status().isBadRequest());

        List<Enlace> enlaceList = enlaceRepository.findAll();
        assertThat(enlaceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkYearIsRequired() throws Exception {
        int databaseSizeBeforeTest = enlaceRepository.findAll().size();
        // set the field null
        enlace.setYear(null);

        // Create the Enlace, which fails.

        restEnlaceMockMvc.perform(post("/api/enlaces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enlace)))
            .andExpect(status().isBadRequest());

        List<Enlace> enlaceList = enlaceRepository.findAll();
        assertThat(enlaceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEnlaces() throws Exception {
        // Initialize the database
        enlaceRepository.saveAndFlush(enlace);

        // Get all the enlaceList
        restEnlaceMockMvc.perform(get("/api/enlaces?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enlace.getId().intValue())))
            .andExpect(jsonPath("$.[*].enlace").value(hasItem(DEFAULT_ENLACE.toString())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR)));
    }

    @Test
    @Transactional
    public void getEnlace() throws Exception {
        // Initialize the database
        enlaceRepository.saveAndFlush(enlace);

        // Get the enlace
        restEnlaceMockMvc.perform(get("/api/enlaces/{id}", enlace.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(enlace.getId().intValue()))
            .andExpect(jsonPath("$.enlace").value(DEFAULT_ENLACE.toString()))
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR));
    }

    @Test
    @Transactional
    public void getNonExistingEnlace() throws Exception {
        // Get the enlace
        restEnlaceMockMvc.perform(get("/api/enlaces/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnlace() throws Exception {
        // Initialize the database
        enlaceRepository.saveAndFlush(enlace);
        enlaceSearchRepository.save(enlace);
        int databaseSizeBeforeUpdate = enlaceRepository.findAll().size();

        // Update the enlace
        Enlace updatedEnlace = enlaceRepository.findOne(enlace.getId());
        // Disconnect from session so that the updates on updatedEnlace are not directly saved in db
        em.detach(updatedEnlace);
        updatedEnlace
            .enlace(UPDATED_ENLACE)
            .year(UPDATED_YEAR);

        restEnlaceMockMvc.perform(put("/api/enlaces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEnlace)))
            .andExpect(status().isOk());

        // Validate the Enlace in the database
        List<Enlace> enlaceList = enlaceRepository.findAll();
        assertThat(enlaceList).hasSize(databaseSizeBeforeUpdate);
        Enlace testEnlace = enlaceList.get(enlaceList.size() - 1);
        assertThat(testEnlace.getEnlace()).isEqualTo(UPDATED_ENLACE);
        assertThat(testEnlace.getYear()).isEqualTo(UPDATED_YEAR);

        // Validate the Enlace in Elasticsearch
        Enlace enlaceEs = enlaceSearchRepository.findOne(testEnlace.getId());
        assertThat(enlaceEs).isEqualToIgnoringGivenFields(testEnlace);
    }

    @Test
    @Transactional
    public void updateNonExistingEnlace() throws Exception {
        int databaseSizeBeforeUpdate = enlaceRepository.findAll().size();

        // Create the Enlace

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEnlaceMockMvc.perform(put("/api/enlaces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enlace)))
            .andExpect(status().isCreated());

        // Validate the Enlace in the database
        List<Enlace> enlaceList = enlaceRepository.findAll();
        assertThat(enlaceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEnlace() throws Exception {
        // Initialize the database
        enlaceRepository.saveAndFlush(enlace);
        enlaceSearchRepository.save(enlace);
        int databaseSizeBeforeDelete = enlaceRepository.findAll().size();

        // Get the enlace
        restEnlaceMockMvc.perform(delete("/api/enlaces/{id}", enlace.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean enlaceExistsInEs = enlaceSearchRepository.exists(enlace.getId());
        assertThat(enlaceExistsInEs).isFalse();

        // Validate the database is empty
        List<Enlace> enlaceList = enlaceRepository.findAll();
        assertThat(enlaceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchEnlace() throws Exception {
        // Initialize the database
        enlaceRepository.saveAndFlush(enlace);
        enlaceSearchRepository.save(enlace);

        // Search the enlace
        restEnlaceMockMvc.perform(get("/api/_search/enlaces?query=id:" + enlace.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enlace.getId().intValue())))
            .andExpect(jsonPath("$.[*].enlace").value(hasItem(DEFAULT_ENLACE.toString())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Enlace.class);
        Enlace enlace1 = new Enlace();
        enlace1.setId(1L);
        Enlace enlace2 = new Enlace();
        enlace2.setId(enlace1.getId());
        assertThat(enlace1).isEqualTo(enlace2);
        enlace2.setId(2L);
        assertThat(enlace1).isNotEqualTo(enlace2);
        enlace1.setId(null);
        assertThat(enlace1).isNotEqualTo(enlace2);
    }
}
