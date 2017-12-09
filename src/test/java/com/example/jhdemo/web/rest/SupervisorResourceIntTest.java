package com.example.jhdemo.web.rest;

import com.example.jhdemo.JhdemoApp;

import com.example.jhdemo.domain.Supervisor;
import com.example.jhdemo.repository.SupervisorRepository;
import com.example.jhdemo.repository.search.SupervisorSearchRepository;
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
 * Test class for the SupervisorResource REST controller.
 *
 * @see SupervisorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhdemoApp.class)
public class SupervisorResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_IDENTIFICACION = "AAAAAAAAAA";
    private static final String UPDATED_IDENTIFICACION = "BBBBBBBBBB";

    private static final String DEFAULT_CARGO = "AAAAAAAAAA";
    private static final String UPDATED_CARGO = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private SupervisorRepository supervisorRepository;

    @Autowired
    private SupervisorSearchRepository supervisorSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSupervisorMockMvc;

    private Supervisor supervisor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SupervisorResource supervisorResource = new SupervisorResource(supervisorRepository, supervisorSearchRepository);
        this.restSupervisorMockMvc = MockMvcBuilders.standaloneSetup(supervisorResource)
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
    public static Supervisor createEntity(EntityManager em) {
        Supervisor supervisor = new Supervisor()
            .nombre(DEFAULT_NOMBRE)
            .identificacion(DEFAULT_IDENTIFICACION)
            .cargo(DEFAULT_CARGO)
            .telefono(DEFAULT_TELEFONO)
            .email(DEFAULT_EMAIL);
        return supervisor;
    }

    @Before
    public void initTest() {
        supervisorSearchRepository.deleteAll();
        supervisor = createEntity(em);
    }

    @Test
    @Transactional
    public void createSupervisor() throws Exception {
        int databaseSizeBeforeCreate = supervisorRepository.findAll().size();

        // Create the Supervisor
        restSupervisorMockMvc.perform(post("/api/supervisors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supervisor)))
            .andExpect(status().isCreated());

        // Validate the Supervisor in the database
        List<Supervisor> supervisorList = supervisorRepository.findAll();
        assertThat(supervisorList).hasSize(databaseSizeBeforeCreate + 1);
        Supervisor testSupervisor = supervisorList.get(supervisorList.size() - 1);
        assertThat(testSupervisor.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testSupervisor.getIdentificacion()).isEqualTo(DEFAULT_IDENTIFICACION);
        assertThat(testSupervisor.getCargo()).isEqualTo(DEFAULT_CARGO);
        assertThat(testSupervisor.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testSupervisor.getEmail()).isEqualTo(DEFAULT_EMAIL);

        // Validate the Supervisor in Elasticsearch
        Supervisor supervisorEs = supervisorSearchRepository.findOne(testSupervisor.getId());
        assertThat(supervisorEs).isEqualToIgnoringGivenFields(testSupervisor);
    }

    @Test
    @Transactional
    public void createSupervisorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supervisorRepository.findAll().size();

        // Create the Supervisor with an existing ID
        supervisor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupervisorMockMvc.perform(post("/api/supervisors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supervisor)))
            .andExpect(status().isBadRequest());

        // Validate the Supervisor in the database
        List<Supervisor> supervisorList = supervisorRepository.findAll();
        assertThat(supervisorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = supervisorRepository.findAll().size();
        // set the field null
        supervisor.setNombre(null);

        // Create the Supervisor, which fails.

        restSupervisorMockMvc.perform(post("/api/supervisors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supervisor)))
            .andExpect(status().isBadRequest());

        List<Supervisor> supervisorList = supervisorRepository.findAll();
        assertThat(supervisorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIdentificacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = supervisorRepository.findAll().size();
        // set the field null
        supervisor.setIdentificacion(null);

        // Create the Supervisor, which fails.

        restSupervisorMockMvc.perform(post("/api/supervisors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supervisor)))
            .andExpect(status().isBadRequest());

        List<Supervisor> supervisorList = supervisorRepository.findAll();
        assertThat(supervisorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCargoIsRequired() throws Exception {
        int databaseSizeBeforeTest = supervisorRepository.findAll().size();
        // set the field null
        supervisor.setCargo(null);

        // Create the Supervisor, which fails.

        restSupervisorMockMvc.perform(post("/api/supervisors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supervisor)))
            .andExpect(status().isBadRequest());

        List<Supervisor> supervisorList = supervisorRepository.findAll();
        assertThat(supervisorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = supervisorRepository.findAll().size();
        // set the field null
        supervisor.setEmail(null);

        // Create the Supervisor, which fails.

        restSupervisorMockMvc.perform(post("/api/supervisors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supervisor)))
            .andExpect(status().isBadRequest());

        List<Supervisor> supervisorList = supervisorRepository.findAll();
        assertThat(supervisorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSupervisors() throws Exception {
        // Initialize the database
        supervisorRepository.saveAndFlush(supervisor);

        // Get all the supervisorList
        restSupervisorMockMvc.perform(get("/api/supervisors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supervisor.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].identificacion").value(hasItem(DEFAULT_IDENTIFICACION.toString())))
            .andExpect(jsonPath("$.[*].cargo").value(hasItem(DEFAULT_CARGO.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }

    @Test
    @Transactional
    public void getSupervisor() throws Exception {
        // Initialize the database
        supervisorRepository.saveAndFlush(supervisor);

        // Get the supervisor
        restSupervisorMockMvc.perform(get("/api/supervisors/{id}", supervisor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(supervisor.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.identificacion").value(DEFAULT_IDENTIFICACION.toString()))
            .andExpect(jsonPath("$.cargo").value(DEFAULT_CARGO.toString()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSupervisor() throws Exception {
        // Get the supervisor
        restSupervisorMockMvc.perform(get("/api/supervisors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSupervisor() throws Exception {
        // Initialize the database
        supervisorRepository.saveAndFlush(supervisor);
        supervisorSearchRepository.save(supervisor);
        int databaseSizeBeforeUpdate = supervisorRepository.findAll().size();

        // Update the supervisor
        Supervisor updatedSupervisor = supervisorRepository.findOne(supervisor.getId());
        // Disconnect from session so that the updates on updatedSupervisor are not directly saved in db
        em.detach(updatedSupervisor);
        updatedSupervisor
            .nombre(UPDATED_NOMBRE)
            .identificacion(UPDATED_IDENTIFICACION)
            .cargo(UPDATED_CARGO)
            .telefono(UPDATED_TELEFONO)
            .email(UPDATED_EMAIL);

        restSupervisorMockMvc.perform(put("/api/supervisors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSupervisor)))
            .andExpect(status().isOk());

        // Validate the Supervisor in the database
        List<Supervisor> supervisorList = supervisorRepository.findAll();
        assertThat(supervisorList).hasSize(databaseSizeBeforeUpdate);
        Supervisor testSupervisor = supervisorList.get(supervisorList.size() - 1);
        assertThat(testSupervisor.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testSupervisor.getIdentificacion()).isEqualTo(UPDATED_IDENTIFICACION);
        assertThat(testSupervisor.getCargo()).isEqualTo(UPDATED_CARGO);
        assertThat(testSupervisor.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testSupervisor.getEmail()).isEqualTo(UPDATED_EMAIL);

        // Validate the Supervisor in Elasticsearch
        Supervisor supervisorEs = supervisorSearchRepository.findOne(testSupervisor.getId());
        assertThat(supervisorEs).isEqualToIgnoringGivenFields(testSupervisor);
    }

    @Test
    @Transactional
    public void updateNonExistingSupervisor() throws Exception {
        int databaseSizeBeforeUpdate = supervisorRepository.findAll().size();

        // Create the Supervisor

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSupervisorMockMvc.perform(put("/api/supervisors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supervisor)))
            .andExpect(status().isCreated());

        // Validate the Supervisor in the database
        List<Supervisor> supervisorList = supervisorRepository.findAll();
        assertThat(supervisorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSupervisor() throws Exception {
        // Initialize the database
        supervisorRepository.saveAndFlush(supervisor);
        supervisorSearchRepository.save(supervisor);
        int databaseSizeBeforeDelete = supervisorRepository.findAll().size();

        // Get the supervisor
        restSupervisorMockMvc.perform(delete("/api/supervisors/{id}", supervisor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean supervisorExistsInEs = supervisorSearchRepository.exists(supervisor.getId());
        assertThat(supervisorExistsInEs).isFalse();

        // Validate the database is empty
        List<Supervisor> supervisorList = supervisorRepository.findAll();
        assertThat(supervisorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchSupervisor() throws Exception {
        // Initialize the database
        supervisorRepository.saveAndFlush(supervisor);
        supervisorSearchRepository.save(supervisor);

        // Search the supervisor
        restSupervisorMockMvc.perform(get("/api/_search/supervisors?query=id:" + supervisor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supervisor.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].identificacion").value(hasItem(DEFAULT_IDENTIFICACION.toString())))
            .andExpect(jsonPath("$.[*].cargo").value(hasItem(DEFAULT_CARGO.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Supervisor.class);
        Supervisor supervisor1 = new Supervisor();
        supervisor1.setId(1L);
        Supervisor supervisor2 = new Supervisor();
        supervisor2.setId(supervisor1.getId());
        assertThat(supervisor1).isEqualTo(supervisor2);
        supervisor2.setId(2L);
        assertThat(supervisor1).isNotEqualTo(supervisor2);
        supervisor1.setId(null);
        assertThat(supervisor1).isNotEqualTo(supervisor2);
    }
}
