package com.example.jhdemo.web.rest;

import com.example.jhdemo.JhdemoApp;

import com.example.jhdemo.domain.Garantia;
import com.example.jhdemo.repository.GarantiaRepository;
import com.example.jhdemo.repository.search.GarantiaSearchRepository;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.example.jhdemo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GarantiaResource REST controller.
 *
 * @see GarantiaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhdemoApp.class)
public class GarantiaResourceIntTest {

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Integer DEFAULT_VIGENCIA_MESES = 1;
    private static final Integer UPDATED_VIGENCIA_MESES = 2;

    private static final Float DEFAULT_PORCENTAJE_COBERTURA = 1F;
    private static final Float UPDATED_PORCENTAJE_COBERTURA = 2F;

    @Autowired
    private GarantiaRepository garantiaRepository;

    @Autowired
    private GarantiaSearchRepository garantiaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGarantiaMockMvc;

    private Garantia garantia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GarantiaResource garantiaResource = new GarantiaResource(garantiaRepository, garantiaSearchRepository);
        this.restGarantiaMockMvc = MockMvcBuilders.standaloneSetup(garantiaResource)
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
    public static Garantia createEntity(EntityManager em) {
        Garantia garantia = new Garantia()
            .titulo(DEFAULT_TITULO)
            .descripcion(DEFAULT_DESCRIPCION)
            .vigenciaMeses(DEFAULT_VIGENCIA_MESES)
            .porcentajeCobertura(DEFAULT_PORCENTAJE_COBERTURA);
        return garantia;
    }

    @Before
    public void initTest() {
        garantiaSearchRepository.deleteAll();
        garantia = createEntity(em);
    }

    @Test
    @Transactional
    public void createGarantia() throws Exception {
        int databaseSizeBeforeCreate = garantiaRepository.findAll().size();

        // Create the Garantia
        restGarantiaMockMvc.perform(post("/api/garantias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(garantia)))
            .andExpect(status().isCreated());

        // Validate the Garantia in the database
        List<Garantia> garantiaList = garantiaRepository.findAll();
        assertThat(garantiaList).hasSize(databaseSizeBeforeCreate + 1);
        Garantia testGarantia = garantiaList.get(garantiaList.size() - 1);
        assertThat(testGarantia.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testGarantia.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testGarantia.getVigenciaMeses()).isEqualTo(DEFAULT_VIGENCIA_MESES);
        assertThat(testGarantia.getPorcentajeCobertura()).isEqualTo(DEFAULT_PORCENTAJE_COBERTURA);

        // Validate the Garantia in Elasticsearch
        Garantia garantiaEs = garantiaSearchRepository.findOne(testGarantia.getId());
        assertThat(garantiaEs).isEqualToIgnoringGivenFields(testGarantia);
    }

    @Test
    @Transactional
    public void createGarantiaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = garantiaRepository.findAll().size();

        // Create the Garantia with an existing ID
        garantia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGarantiaMockMvc.perform(post("/api/garantias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(garantia)))
            .andExpect(status().isBadRequest());

        // Validate the Garantia in the database
        List<Garantia> garantiaList = garantiaRepository.findAll();
        assertThat(garantiaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTituloIsRequired() throws Exception {
        int databaseSizeBeforeTest = garantiaRepository.findAll().size();
        // set the field null
        garantia.setTitulo(null);

        // Create the Garantia, which fails.

        restGarantiaMockMvc.perform(post("/api/garantias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(garantia)))
            .andExpect(status().isBadRequest());

        List<Garantia> garantiaList = garantiaRepository.findAll();
        assertThat(garantiaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = garantiaRepository.findAll().size();
        // set the field null
        garantia.setDescripcion(null);

        // Create the Garantia, which fails.

        restGarantiaMockMvc.perform(post("/api/garantias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(garantia)))
            .andExpect(status().isBadRequest());

        List<Garantia> garantiaList = garantiaRepository.findAll();
        assertThat(garantiaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkVigenciaMesesIsRequired() throws Exception {
        int databaseSizeBeforeTest = garantiaRepository.findAll().size();
        // set the field null
        garantia.setVigenciaMeses(null);

        // Create the Garantia, which fails.

        restGarantiaMockMvc.perform(post("/api/garantias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(garantia)))
            .andExpect(status().isBadRequest());

        List<Garantia> garantiaList = garantiaRepository.findAll();
        assertThat(garantiaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPorcentajeCoberturaIsRequired() throws Exception {
        int databaseSizeBeforeTest = garantiaRepository.findAll().size();
        // set the field null
        garantia.setPorcentajeCobertura(null);

        // Create the Garantia, which fails.

        restGarantiaMockMvc.perform(post("/api/garantias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(garantia)))
            .andExpect(status().isBadRequest());

        List<Garantia> garantiaList = garantiaRepository.findAll();
        assertThat(garantiaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGarantias() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList
        restGarantiaMockMvc.perform(get("/api/garantias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(garantia.getId().intValue())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].vigenciaMeses").value(hasItem(DEFAULT_VIGENCIA_MESES)))
            .andExpect(jsonPath("$.[*].porcentajeCobertura").value(hasItem(DEFAULT_PORCENTAJE_COBERTURA.doubleValue())));
    }

    @Test
    @Transactional
    public void getGarantia() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get the garantia
        restGarantiaMockMvc.perform(get("/api/garantias/{id}", garantia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(garantia.getId().intValue()))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.vigenciaMeses").value(DEFAULT_VIGENCIA_MESES))
            .andExpect(jsonPath("$.porcentajeCobertura").value(DEFAULT_PORCENTAJE_COBERTURA.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGarantia() throws Exception {
        // Get the garantia
        restGarantiaMockMvc.perform(get("/api/garantias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGarantia() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);
        garantiaSearchRepository.save(garantia);
        int databaseSizeBeforeUpdate = garantiaRepository.findAll().size();

        // Update the garantia
        Garantia updatedGarantia = garantiaRepository.findOne(garantia.getId());
        // Disconnect from session so that the updates on updatedGarantia are not directly saved in db
        em.detach(updatedGarantia);
        updatedGarantia
            .titulo(UPDATED_TITULO)
            .descripcion(UPDATED_DESCRIPCION)
            .vigenciaMeses(UPDATED_VIGENCIA_MESES)
            .porcentajeCobertura(UPDATED_PORCENTAJE_COBERTURA);

        restGarantiaMockMvc.perform(put("/api/garantias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGarantia)))
            .andExpect(status().isOk());

        // Validate the Garantia in the database
        List<Garantia> garantiaList = garantiaRepository.findAll();
        assertThat(garantiaList).hasSize(databaseSizeBeforeUpdate);
        Garantia testGarantia = garantiaList.get(garantiaList.size() - 1);
        assertThat(testGarantia.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testGarantia.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testGarantia.getVigenciaMeses()).isEqualTo(UPDATED_VIGENCIA_MESES);
        assertThat(testGarantia.getPorcentajeCobertura()).isEqualTo(UPDATED_PORCENTAJE_COBERTURA);

        // Validate the Garantia in Elasticsearch
        Garantia garantiaEs = garantiaSearchRepository.findOne(testGarantia.getId());
        assertThat(garantiaEs).isEqualToIgnoringGivenFields(testGarantia);
    }

    @Test
    @Transactional
    public void updateNonExistingGarantia() throws Exception {
        int databaseSizeBeforeUpdate = garantiaRepository.findAll().size();

        // Create the Garantia

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGarantiaMockMvc.perform(put("/api/garantias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(garantia)))
            .andExpect(status().isCreated());

        // Validate the Garantia in the database
        List<Garantia> garantiaList = garantiaRepository.findAll();
        assertThat(garantiaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGarantia() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);
        garantiaSearchRepository.save(garantia);
        int databaseSizeBeforeDelete = garantiaRepository.findAll().size();

        // Get the garantia
        restGarantiaMockMvc.perform(delete("/api/garantias/{id}", garantia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean garantiaExistsInEs = garantiaSearchRepository.exists(garantia.getId());
        assertThat(garantiaExistsInEs).isFalse();

        // Validate the database is empty
        List<Garantia> garantiaList = garantiaRepository.findAll();
        assertThat(garantiaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchGarantia() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);
        garantiaSearchRepository.save(garantia);

        // Search the garantia
        restGarantiaMockMvc.perform(get("/api/_search/garantias?query=id:" + garantia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(garantia.getId().intValue())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].vigenciaMeses").value(hasItem(DEFAULT_VIGENCIA_MESES)))
            .andExpect(jsonPath("$.[*].porcentajeCobertura").value(hasItem(DEFAULT_PORCENTAJE_COBERTURA.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Garantia.class);
        Garantia garantia1 = new Garantia();
        garantia1.setId(1L);
        Garantia garantia2 = new Garantia();
        garantia2.setId(garantia1.getId());
        assertThat(garantia1).isEqualTo(garantia2);
        garantia2.setId(2L);
        assertThat(garantia1).isNotEqualTo(garantia2);
        garantia1.setId(null);
        assertThat(garantia1).isNotEqualTo(garantia2);
    }
}
