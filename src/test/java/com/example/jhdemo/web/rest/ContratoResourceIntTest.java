package com.example.jhdemo.web.rest;

import com.example.jhdemo.JhdemoApp;

import com.example.jhdemo.domain.Contrato;
import com.example.jhdemo.repository.ContratoRepository;
import com.example.jhdemo.repository.search.ContratoSearchRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.example.jhdemo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.example.jhdemo.domain.enumeration.Country;
/**
 * Test class for the ContratoResource REST controller.
 *
 * @see ContratoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhdemoApp.class)
public class ContratoResourceIntTest {

    private static final String DEFAULT_CODIGO_CONTRATO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_CONTRATO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_INICIO_CONTRATO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_INICIO_CONTRATO = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_PLAZO_MESES = 1;
    private static final Integer UPDATED_PLAZO_MESES = 2;

    private static final String DEFAULT_OBJETO_CONTRATO = "AAAAAAAAAA";
    private static final String UPDATED_OBJETO_CONTRATO = "BBBBBBBBBB";

    private static final Float DEFAULT_MONTO = 1F;
    private static final Float UPDATED_MONTO = 2F;

    private static final Country DEFAULT_NACIONALIDAD = Country.ARGENTINA;
    private static final Country UPDATED_NACIONALIDAD = Country.BOLIVIA;

    private static final String DEFAULT_PARTIDA_PRESUPUESTARIA = "AAAAAAAAAA";
    private static final String UPDATED_PARTIDA_PRESUPUESTARIA = "BBBBBBBBBB";

    @Autowired
    private ContratoRepository contratoRepository;

    @Autowired
    private ContratoSearchRepository contratoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restContratoMockMvc;

    private Contrato contrato;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContratoResource contratoResource = new ContratoResource(contratoRepository, contratoSearchRepository);
        this.restContratoMockMvc = MockMvcBuilders.standaloneSetup(contratoResource)
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
    public static Contrato createEntity(EntityManager em) {
        Contrato contrato = new Contrato()
            .codigoContrato(DEFAULT_CODIGO_CONTRATO)
            .inicioContrato(DEFAULT_INICIO_CONTRATO)
            .plazoMeses(DEFAULT_PLAZO_MESES)
            .objetoContrato(DEFAULT_OBJETO_CONTRATO)
            .monto(DEFAULT_MONTO)
            .nacionalidad(DEFAULT_NACIONALIDAD)
            .partidaPresupuestaria(DEFAULT_PARTIDA_PRESUPUESTARIA);
        return contrato;
    }

    @Before
    public void initTest() {
        contratoSearchRepository.deleteAll();
        contrato = createEntity(em);
    }

    @Test
    @Transactional
    public void createContrato() throws Exception {
        int databaseSizeBeforeCreate = contratoRepository.findAll().size();

        // Create the Contrato
        restContratoMockMvc.perform(post("/api/contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contrato)))
            .andExpect(status().isCreated());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeCreate + 1);
        Contrato testContrato = contratoList.get(contratoList.size() - 1);
        assertThat(testContrato.getCodigoContrato()).isEqualTo(DEFAULT_CODIGO_CONTRATO);
        assertThat(testContrato.getInicioContrato()).isEqualTo(DEFAULT_INICIO_CONTRATO);
        assertThat(testContrato.getPlazoMeses()).isEqualTo(DEFAULT_PLAZO_MESES);
        assertThat(testContrato.getObjetoContrato()).isEqualTo(DEFAULT_OBJETO_CONTRATO);
        assertThat(testContrato.getMonto()).isEqualTo(DEFAULT_MONTO);
        assertThat(testContrato.getNacionalidad()).isEqualTo(DEFAULT_NACIONALIDAD);
        assertThat(testContrato.getPartidaPresupuestaria()).isEqualTo(DEFAULT_PARTIDA_PRESUPUESTARIA);

        // Validate the Contrato in Elasticsearch
        Contrato contratoEs = contratoSearchRepository.findOne(testContrato.getId());
        assertThat(contratoEs).isEqualToIgnoringGivenFields(testContrato);
    }

    @Test
    @Transactional
    public void createContratoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contratoRepository.findAll().size();

        // Create the Contrato with an existing ID
        contrato.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContratoMockMvc.perform(post("/api/contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contrato)))
            .andExpect(status().isBadRequest());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodigoContratoIsRequired() throws Exception {
        int databaseSizeBeforeTest = contratoRepository.findAll().size();
        // set the field null
        contrato.setCodigoContrato(null);

        // Create the Contrato, which fails.

        restContratoMockMvc.perform(post("/api/contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contrato)))
            .andExpect(status().isBadRequest());

        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkInicioContratoIsRequired() throws Exception {
        int databaseSizeBeforeTest = contratoRepository.findAll().size();
        // set the field null
        contrato.setInicioContrato(null);

        // Create the Contrato, which fails.

        restContratoMockMvc.perform(post("/api/contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contrato)))
            .andExpect(status().isBadRequest());

        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPlazoMesesIsRequired() throws Exception {
        int databaseSizeBeforeTest = contratoRepository.findAll().size();
        // set the field null
        contrato.setPlazoMeses(null);

        // Create the Contrato, which fails.

        restContratoMockMvc.perform(post("/api/contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contrato)))
            .andExpect(status().isBadRequest());

        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkObjetoContratoIsRequired() throws Exception {
        int databaseSizeBeforeTest = contratoRepository.findAll().size();
        // set the field null
        contrato.setObjetoContrato(null);

        // Create the Contrato, which fails.

        restContratoMockMvc.perform(post("/api/contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contrato)))
            .andExpect(status().isBadRequest());

        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMontoIsRequired() throws Exception {
        int databaseSizeBeforeTest = contratoRepository.findAll().size();
        // set the field null
        contrato.setMonto(null);

        // Create the Contrato, which fails.

        restContratoMockMvc.perform(post("/api/contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contrato)))
            .andExpect(status().isBadRequest());

        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPartidaPresupuestariaIsRequired() throws Exception {
        int databaseSizeBeforeTest = contratoRepository.findAll().size();
        // set the field null
        contrato.setPartidaPresupuestaria(null);

        // Create the Contrato, which fails.

        restContratoMockMvc.perform(post("/api/contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contrato)))
            .andExpect(status().isBadRequest());

        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllContratoes() throws Exception {
        // Initialize the database
        contratoRepository.saveAndFlush(contrato);

        // Get all the contratoList
        restContratoMockMvc.perform(get("/api/contratoes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contrato.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigoContrato").value(hasItem(DEFAULT_CODIGO_CONTRATO.toString())))
            .andExpect(jsonPath("$.[*].inicioContrato").value(hasItem(DEFAULT_INICIO_CONTRATO.toString())))
            .andExpect(jsonPath("$.[*].plazoMeses").value(hasItem(DEFAULT_PLAZO_MESES)))
            .andExpect(jsonPath("$.[*].objetoContrato").value(hasItem(DEFAULT_OBJETO_CONTRATO.toString())))
            .andExpect(jsonPath("$.[*].monto").value(hasItem(DEFAULT_MONTO.doubleValue())))
            .andExpect(jsonPath("$.[*].nacionalidad").value(hasItem(DEFAULT_NACIONALIDAD.toString())))
            .andExpect(jsonPath("$.[*].partidaPresupuestaria").value(hasItem(DEFAULT_PARTIDA_PRESUPUESTARIA.toString())));
    }

    @Test
    @Transactional
    public void getContrato() throws Exception {
        // Initialize the database
        contratoRepository.saveAndFlush(contrato);

        // Get the contrato
        restContratoMockMvc.perform(get("/api/contratoes/{id}", contrato.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contrato.getId().intValue()))
            .andExpect(jsonPath("$.codigoContrato").value(DEFAULT_CODIGO_CONTRATO.toString()))
            .andExpect(jsonPath("$.inicioContrato").value(DEFAULT_INICIO_CONTRATO.toString()))
            .andExpect(jsonPath("$.plazoMeses").value(DEFAULT_PLAZO_MESES))
            .andExpect(jsonPath("$.objetoContrato").value(DEFAULT_OBJETO_CONTRATO.toString()))
            .andExpect(jsonPath("$.monto").value(DEFAULT_MONTO.doubleValue()))
            .andExpect(jsonPath("$.nacionalidad").value(DEFAULT_NACIONALIDAD.toString()))
            .andExpect(jsonPath("$.partidaPresupuestaria").value(DEFAULT_PARTIDA_PRESUPUESTARIA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingContrato() throws Exception {
        // Get the contrato
        restContratoMockMvc.perform(get("/api/contratoes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContrato() throws Exception {
        // Initialize the database
        contratoRepository.saveAndFlush(contrato);
        contratoSearchRepository.save(contrato);
        int databaseSizeBeforeUpdate = contratoRepository.findAll().size();

        // Update the contrato
        Contrato updatedContrato = contratoRepository.findOne(contrato.getId());
        // Disconnect from session so that the updates on updatedContrato are not directly saved in db
        em.detach(updatedContrato);
        updatedContrato
            .codigoContrato(UPDATED_CODIGO_CONTRATO)
            .inicioContrato(UPDATED_INICIO_CONTRATO)
            .plazoMeses(UPDATED_PLAZO_MESES)
            .objetoContrato(UPDATED_OBJETO_CONTRATO)
            .monto(UPDATED_MONTO)
            .nacionalidad(UPDATED_NACIONALIDAD)
            .partidaPresupuestaria(UPDATED_PARTIDA_PRESUPUESTARIA);

        restContratoMockMvc.perform(put("/api/contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContrato)))
            .andExpect(status().isOk());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeUpdate);
        Contrato testContrato = contratoList.get(contratoList.size() - 1);
        assertThat(testContrato.getCodigoContrato()).isEqualTo(UPDATED_CODIGO_CONTRATO);
        assertThat(testContrato.getInicioContrato()).isEqualTo(UPDATED_INICIO_CONTRATO);
        assertThat(testContrato.getPlazoMeses()).isEqualTo(UPDATED_PLAZO_MESES);
        assertThat(testContrato.getObjetoContrato()).isEqualTo(UPDATED_OBJETO_CONTRATO);
        assertThat(testContrato.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testContrato.getNacionalidad()).isEqualTo(UPDATED_NACIONALIDAD);
        assertThat(testContrato.getPartidaPresupuestaria()).isEqualTo(UPDATED_PARTIDA_PRESUPUESTARIA);

        // Validate the Contrato in Elasticsearch
        Contrato contratoEs = contratoSearchRepository.findOne(testContrato.getId());
        assertThat(contratoEs).isEqualToIgnoringGivenFields(testContrato);
    }

    @Test
    @Transactional
    public void updateNonExistingContrato() throws Exception {
        int databaseSizeBeforeUpdate = contratoRepository.findAll().size();

        // Create the Contrato

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restContratoMockMvc.perform(put("/api/contratoes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contrato)))
            .andExpect(status().isCreated());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteContrato() throws Exception {
        // Initialize the database
        contratoRepository.saveAndFlush(contrato);
        contratoSearchRepository.save(contrato);
        int databaseSizeBeforeDelete = contratoRepository.findAll().size();

        // Get the contrato
        restContratoMockMvc.perform(delete("/api/contratoes/{id}", contrato.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean contratoExistsInEs = contratoSearchRepository.exists(contrato.getId());
        assertThat(contratoExistsInEs).isFalse();

        // Validate the database is empty
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchContrato() throws Exception {
        // Initialize the database
        contratoRepository.saveAndFlush(contrato);
        contratoSearchRepository.save(contrato);

        // Search the contrato
        restContratoMockMvc.perform(get("/api/_search/contratoes?query=id:" + contrato.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contrato.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigoContrato").value(hasItem(DEFAULT_CODIGO_CONTRATO.toString())))
            .andExpect(jsonPath("$.[*].inicioContrato").value(hasItem(DEFAULT_INICIO_CONTRATO.toString())))
            .andExpect(jsonPath("$.[*].plazoMeses").value(hasItem(DEFAULT_PLAZO_MESES)))
            .andExpect(jsonPath("$.[*].objetoContrato").value(hasItem(DEFAULT_OBJETO_CONTRATO.toString())))
            .andExpect(jsonPath("$.[*].monto").value(hasItem(DEFAULT_MONTO.doubleValue())))
            .andExpect(jsonPath("$.[*].nacionalidad").value(hasItem(DEFAULT_NACIONALIDAD.toString())))
            .andExpect(jsonPath("$.[*].partidaPresupuestaria").value(hasItem(DEFAULT_PARTIDA_PRESUPUESTARIA.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contrato.class);
        Contrato contrato1 = new Contrato();
        contrato1.setId(1L);
        Contrato contrato2 = new Contrato();
        contrato2.setId(contrato1.getId());
        assertThat(contrato1).isEqualTo(contrato2);
        contrato2.setId(2L);
        assertThat(contrato1).isNotEqualTo(contrato2);
        contrato1.setId(null);
        assertThat(contrato1).isNotEqualTo(contrato2);
    }
}
