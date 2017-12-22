package com.example.jhdemo.web.rest;

import com.example.jhdemo.JhdemoApp;

import com.example.jhdemo.domain.Contratista;
import com.example.jhdemo.repository.ContratistaRepository;
import com.example.jhdemo.repository.search.ContratistaSearchRepository;
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
 * Test class for the ContratistaResource REST controller.
 *
 * @see ContratistaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhdemoApp.class)
public class ContratistaResourceIntTest {

    private static final String DEFAULT_RAZON_SOCIAL = "AAAAAAAAAA";
    private static final String UPDATED_RAZON_SOCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_RUC = "AAAAAAAAAAAAA";
    private static final String UPDATED_RUC = "BBBBBBBBBBBBB";

    private static final String DEFAULT_CONTACTO_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_CONTACTO_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private ContratistaRepository contratistaRepository;

    @Autowired
    private ContratistaSearchRepository contratistaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restContratistaMockMvc;

    private Contratista contratista;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContratistaResource contratistaResource = new ContratistaResource(contratistaRepository, contratistaSearchRepository);
        this.restContratistaMockMvc = MockMvcBuilders.standaloneSetup(contratistaResource)
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
    public static Contratista createEntity(EntityManager em) {
        Contratista contratista = new Contratista()
            .razonSocial(DEFAULT_RAZON_SOCIAL)
            .ruc(DEFAULT_RUC)
            .contactoNombre(DEFAULT_CONTACTO_NOMBRE)
            .direccion(DEFAULT_DIRECCION)
            .telefono(DEFAULT_TELEFONO)
            .email(DEFAULT_EMAIL);
        return contratista;
    }

    @Before
    public void initTest() {
        contratistaSearchRepository.deleteAll();
        contratista = createEntity(em);
    }

    @Test
    @Transactional
    public void createContratista() throws Exception {
        int databaseSizeBeforeCreate = contratistaRepository.findAll().size();

        // Create the Contratista
        restContratistaMockMvc.perform(post("/api/contratistas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contratista)))
            .andExpect(status().isCreated());

        // Validate the Contratista in the database
        List<Contratista> contratistaList = contratistaRepository.findAll();
        assertThat(contratistaList).hasSize(databaseSizeBeforeCreate + 1);
        Contratista testContratista = contratistaList.get(contratistaList.size() - 1);
        assertThat(testContratista.getRazonSocial()).isEqualTo(DEFAULT_RAZON_SOCIAL);
        assertThat(testContratista.getRuc()).isEqualTo(DEFAULT_RUC);
        assertThat(testContratista.getContactoNombre()).isEqualTo(DEFAULT_CONTACTO_NOMBRE);
        assertThat(testContratista.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testContratista.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testContratista.getEmail()).isEqualTo(DEFAULT_EMAIL);

        // Validate the Contratista in Elasticsearch
        Contratista contratistaEs = contratistaSearchRepository.findOne(testContratista.getId());
        assertThat(contratistaEs).isEqualToIgnoringGivenFields(testContratista);
    }

    @Test
    @Transactional
    public void createContratistaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contratistaRepository.findAll().size();

        // Create the Contratista with an existing ID
        contratista.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContratistaMockMvc.perform(post("/api/contratistas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contratista)))
            .andExpect(status().isBadRequest());

        // Validate the Contratista in the database
        List<Contratista> contratistaList = contratistaRepository.findAll();
        assertThat(contratistaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkRazonSocialIsRequired() throws Exception {
        int databaseSizeBeforeTest = contratistaRepository.findAll().size();
        // set the field null
        contratista.setRazonSocial(null);

        // Create the Contratista, which fails.

        restContratistaMockMvc.perform(post("/api/contratistas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contratista)))
            .andExpect(status().isBadRequest());

        List<Contratista> contratistaList = contratistaRepository.findAll();
        assertThat(contratistaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRucIsRequired() throws Exception {
        int databaseSizeBeforeTest = contratistaRepository.findAll().size();
        // set the field null
        contratista.setRuc(null);

        // Create the Contratista, which fails.

        restContratistaMockMvc.perform(post("/api/contratistas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contratista)))
            .andExpect(status().isBadRequest());

        List<Contratista> contratistaList = contratistaRepository.findAll();
        assertThat(contratistaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllContratistas() throws Exception {
        // Initialize the database
        contratistaRepository.saveAndFlush(contratista);

        // Get all the contratistaList
        restContratistaMockMvc.perform(get("/api/contratistas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contratista.getId().intValue())))
            .andExpect(jsonPath("$.[*].razonSocial").value(hasItem(DEFAULT_RAZON_SOCIAL.toString())))
            .andExpect(jsonPath("$.[*].ruc").value(hasItem(DEFAULT_RUC.toString())))
            .andExpect(jsonPath("$.[*].contactoNombre").value(hasItem(DEFAULT_CONTACTO_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }

    @Test
    @Transactional
    public void getContratista() throws Exception {
        // Initialize the database
        contratistaRepository.saveAndFlush(contratista);

        // Get the contratista
        restContratistaMockMvc.perform(get("/api/contratistas/{id}", contratista.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contratista.getId().intValue()))
            .andExpect(jsonPath("$.razonSocial").value(DEFAULT_RAZON_SOCIAL.toString()))
            .andExpect(jsonPath("$.ruc").value(DEFAULT_RUC.toString()))
            .andExpect(jsonPath("$.contactoNombre").value(DEFAULT_CONTACTO_NOMBRE.toString()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingContratista() throws Exception {
        // Get the contratista
        restContratistaMockMvc.perform(get("/api/contratistas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContratista() throws Exception {
        // Initialize the database
        contratistaRepository.saveAndFlush(contratista);
        contratistaSearchRepository.save(contratista);
        int databaseSizeBeforeUpdate = contratistaRepository.findAll().size();

        // Update the contratista
        Contratista updatedContratista = contratistaRepository.findOne(contratista.getId());
        // Disconnect from session so that the updates on updatedContratista are not directly saved in db
        em.detach(updatedContratista);
        updatedContratista
            .razonSocial(UPDATED_RAZON_SOCIAL)
            .ruc(UPDATED_RUC)
            .contactoNombre(UPDATED_CONTACTO_NOMBRE)
            .direccion(UPDATED_DIRECCION)
            .telefono(UPDATED_TELEFONO)
            .email(UPDATED_EMAIL);

        restContratistaMockMvc.perform(put("/api/contratistas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContratista)))
            .andExpect(status().isOk());

        // Validate the Contratista in the database
        List<Contratista> contratistaList = contratistaRepository.findAll();
        assertThat(contratistaList).hasSize(databaseSizeBeforeUpdate);
        Contratista testContratista = contratistaList.get(contratistaList.size() - 1);
        assertThat(testContratista.getRazonSocial()).isEqualTo(UPDATED_RAZON_SOCIAL);
        assertThat(testContratista.getRuc()).isEqualTo(UPDATED_RUC);
        assertThat(testContratista.getContactoNombre()).isEqualTo(UPDATED_CONTACTO_NOMBRE);
        assertThat(testContratista.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testContratista.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testContratista.getEmail()).isEqualTo(UPDATED_EMAIL);

        // Validate the Contratista in Elasticsearch
        Contratista contratistaEs = contratistaSearchRepository.findOne(testContratista.getId());
        assertThat(contratistaEs).isEqualToIgnoringGivenFields(testContratista);
    }

    @Test
    @Transactional
    public void updateNonExistingContratista() throws Exception {
        int databaseSizeBeforeUpdate = contratistaRepository.findAll().size();

        // Create the Contratista

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restContratistaMockMvc.perform(put("/api/contratistas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contratista)))
            .andExpect(status().isCreated());

        // Validate the Contratista in the database
        List<Contratista> contratistaList = contratistaRepository.findAll();
        assertThat(contratistaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteContratista() throws Exception {
        // Initialize the database
        contratistaRepository.saveAndFlush(contratista);
        contratistaSearchRepository.save(contratista);
        int databaseSizeBeforeDelete = contratistaRepository.findAll().size();

        // Get the contratista
        restContratistaMockMvc.perform(delete("/api/contratistas/{id}", contratista.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean contratistaExistsInEs = contratistaSearchRepository.exists(contratista.getId());
        assertThat(contratistaExistsInEs).isFalse();

        // Validate the database is empty
        List<Contratista> contratistaList = contratistaRepository.findAll();
        assertThat(contratistaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchContratista() throws Exception {
        // Initialize the database
        contratistaRepository.saveAndFlush(contratista);
        contratistaSearchRepository.save(contratista);

        // Search the contratista
        restContratistaMockMvc.perform(get("/api/_search/contratistas?query=id:" + contratista.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contratista.getId().intValue())))
            .andExpect(jsonPath("$.[*].razonSocial").value(hasItem(DEFAULT_RAZON_SOCIAL.toString())))
            .andExpect(jsonPath("$.[*].ruc").value(hasItem(DEFAULT_RUC.toString())))
            .andExpect(jsonPath("$.[*].contactoNombre").value(hasItem(DEFAULT_CONTACTO_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contratista.class);
        Contratista contratista1 = new Contratista();
        contratista1.setId(1L);
        Contratista contratista2 = new Contratista();
        contratista2.setId(contratista1.getId());
        assertThat(contratista1).isEqualTo(contratista2);
        contratista2.setId(2L);
        assertThat(contratista1).isNotEqualTo(contratista2);
        contratista1.setId(null);
        assertThat(contratista1).isNotEqualTo(contratista2);
    }
}
