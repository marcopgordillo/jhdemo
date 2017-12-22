package com.example.jhdemo.web.rest;

import com.example.jhdemo.JhdemoApp;

import com.example.jhdemo.domain.Administrador;
import com.example.jhdemo.repository.AdministradorRepository;
import com.example.jhdemo.repository.search.AdministradorSearchRepository;
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
 * Test class for the AdministradorResource REST controller.
 *
 * @see AdministradorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhdemoApp.class)
public class AdministradorResourceIntTest {

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
    private AdministradorRepository administradorRepository;

    @Autowired
    private AdministradorSearchRepository administradorSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAdministradorMockMvc;

    private Administrador administrador;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AdministradorResource administradorResource = new AdministradorResource(administradorRepository, administradorSearchRepository);
        this.restAdministradorMockMvc = MockMvcBuilders.standaloneSetup(administradorResource)
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
    public static Administrador createEntity(EntityManager em) {
        Administrador administrador = new Administrador()
            .nombre(DEFAULT_NOMBRE)
            .identificacion(DEFAULT_IDENTIFICACION)
            .cargo(DEFAULT_CARGO)
            .telefono(DEFAULT_TELEFONO)
            .email(DEFAULT_EMAIL);
        return administrador;
    }

    @Before
    public void initTest() {
        administradorSearchRepository.deleteAll();
        administrador = createEntity(em);
    }

    @Test
    @Transactional
    public void createAdministrador() throws Exception {
        int databaseSizeBeforeCreate = administradorRepository.findAll().size();

        // Create the Administrador
        restAdministradorMockMvc.perform(post("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrador)))
            .andExpect(status().isCreated());

        // Validate the Administrador in the database
        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeCreate + 1);
        Administrador testAdministrador = administradorList.get(administradorList.size() - 1);
        assertThat(testAdministrador.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testAdministrador.getIdentificacion()).isEqualTo(DEFAULT_IDENTIFICACION);
        assertThat(testAdministrador.getCargo()).isEqualTo(DEFAULT_CARGO);
        assertThat(testAdministrador.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testAdministrador.getEmail()).isEqualTo(DEFAULT_EMAIL);

        // Validate the Administrador in Elasticsearch
        Administrador administradorEs = administradorSearchRepository.findOne(testAdministrador.getId());
        assertThat(administradorEs).isEqualToIgnoringGivenFields(testAdministrador);
    }

    @Test
    @Transactional
    public void createAdministradorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = administradorRepository.findAll().size();

        // Create the Administrador with an existing ID
        administrador.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdministradorMockMvc.perform(post("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrador)))
            .andExpect(status().isBadRequest());

        // Validate the Administrador in the database
        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = administradorRepository.findAll().size();
        // set the field null
        administrador.setNombre(null);

        // Create the Administrador, which fails.

        restAdministradorMockMvc.perform(post("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrador)))
            .andExpect(status().isBadRequest());

        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIdentificacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = administradorRepository.findAll().size();
        // set the field null
        administrador.setIdentificacion(null);

        // Create the Administrador, which fails.

        restAdministradorMockMvc.perform(post("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrador)))
            .andExpect(status().isBadRequest());

        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCargoIsRequired() throws Exception {
        int databaseSizeBeforeTest = administradorRepository.findAll().size();
        // set the field null
        administrador.setCargo(null);

        // Create the Administrador, which fails.

        restAdministradorMockMvc.perform(post("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrador)))
            .andExpect(status().isBadRequest());

        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = administradorRepository.findAll().size();
        // set the field null
        administrador.setEmail(null);

        // Create the Administrador, which fails.

        restAdministradorMockMvc.perform(post("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrador)))
            .andExpect(status().isBadRequest());

        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAdministradors() throws Exception {
        // Initialize the database
        administradorRepository.saveAndFlush(administrador);

        // Get all the administradorList
        restAdministradorMockMvc.perform(get("/api/administradors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(administrador.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].identificacion").value(hasItem(DEFAULT_IDENTIFICACION.toString())))
            .andExpect(jsonPath("$.[*].cargo").value(hasItem(DEFAULT_CARGO.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }

    @Test
    @Transactional
    public void getAdministrador() throws Exception {
        // Initialize the database
        administradorRepository.saveAndFlush(administrador);

        // Get the administrador
        restAdministradorMockMvc.perform(get("/api/administradors/{id}", administrador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(administrador.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.identificacion").value(DEFAULT_IDENTIFICACION.toString()))
            .andExpect(jsonPath("$.cargo").value(DEFAULT_CARGO.toString()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAdministrador() throws Exception {
        // Get the administrador
        restAdministradorMockMvc.perform(get("/api/administradors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAdministrador() throws Exception {
        // Initialize the database
        administradorRepository.saveAndFlush(administrador);
        administradorSearchRepository.save(administrador);
        int databaseSizeBeforeUpdate = administradorRepository.findAll().size();

        // Update the administrador
        Administrador updatedAdministrador = administradorRepository.findOne(administrador.getId());
        // Disconnect from session so that the updates on updatedAdministrador are not directly saved in db
        em.detach(updatedAdministrador);
        updatedAdministrador
            .nombre(UPDATED_NOMBRE)
            .identificacion(UPDATED_IDENTIFICACION)
            .cargo(UPDATED_CARGO)
            .telefono(UPDATED_TELEFONO)
            .email(UPDATED_EMAIL);

        restAdministradorMockMvc.perform(put("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAdministrador)))
            .andExpect(status().isOk());

        // Validate the Administrador in the database
        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeUpdate);
        Administrador testAdministrador = administradorList.get(administradorList.size() - 1);
        assertThat(testAdministrador.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testAdministrador.getIdentificacion()).isEqualTo(UPDATED_IDENTIFICACION);
        assertThat(testAdministrador.getCargo()).isEqualTo(UPDATED_CARGO);
        assertThat(testAdministrador.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testAdministrador.getEmail()).isEqualTo(UPDATED_EMAIL);

        // Validate the Administrador in Elasticsearch
        Administrador administradorEs = administradorSearchRepository.findOne(testAdministrador.getId());
        assertThat(administradorEs).isEqualToIgnoringGivenFields(testAdministrador);
    }

    @Test
    @Transactional
    public void updateNonExistingAdministrador() throws Exception {
        int databaseSizeBeforeUpdate = administradorRepository.findAll().size();

        // Create the Administrador

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAdministradorMockMvc.perform(put("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrador)))
            .andExpect(status().isCreated());

        // Validate the Administrador in the database
        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAdministrador() throws Exception {
        // Initialize the database
        administradorRepository.saveAndFlush(administrador);
        administradorSearchRepository.save(administrador);
        int databaseSizeBeforeDelete = administradorRepository.findAll().size();

        // Get the administrador
        restAdministradorMockMvc.perform(delete("/api/administradors/{id}", administrador.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean administradorExistsInEs = administradorSearchRepository.exists(administrador.getId());
        assertThat(administradorExistsInEs).isFalse();

        // Validate the database is empty
        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAdministrador() throws Exception {
        // Initialize the database
        administradorRepository.saveAndFlush(administrador);
        administradorSearchRepository.save(administrador);

        // Search the administrador
        restAdministradorMockMvc.perform(get("/api/_search/administradors?query=id:" + administrador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(administrador.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].identificacion").value(hasItem(DEFAULT_IDENTIFICACION.toString())))
            .andExpect(jsonPath("$.[*].cargo").value(hasItem(DEFAULT_CARGO.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Administrador.class);
        Administrador administrador1 = new Administrador();
        administrador1.setId(1L);
        Administrador administrador2 = new Administrador();
        administrador2.setId(administrador1.getId());
        assertThat(administrador1).isEqualTo(administrador2);
        administrador2.setId(2L);
        assertThat(administrador1).isNotEqualTo(administrador2);
        administrador1.setId(null);
        assertThat(administrador1).isNotEqualTo(administrador2);
    }
}
