package com.ainguyen.app.web.rest;

import com.ainguyen.app.GsiteApp;

import com.ainguyen.app.domain.WebTemplate;
import com.ainguyen.app.repository.WebTemplateRepository;
import com.ainguyen.app.service.WebTemplateService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WebTemplateResource REST controller.
 *
 * @see WebTemplateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GsiteApp.class)
public class WebTemplateResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE= "AAAAAAAAAA";
    private static final String UPDATED_IMAGE = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORY= "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    private static final String DEFAULT_SOURCE = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE = "BBBBBBBBBB";

    @Inject
    private WebTemplateRepository webTemplateRepository;

    @Inject
    private WebTemplateService webTemplateService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restWebTemplateMockMvc;

    private WebTemplate webTemplate;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        WebTemplateResource webTemplateResource = new WebTemplateResource();
        ReflectionTestUtils.setField(webTemplateResource, "webTemplateService", webTemplateService);
        this.restWebTemplateMockMvc = MockMvcBuilders.standaloneSetup(webTemplateResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WebTemplate createEntity() {
        WebTemplate webTemplate = new WebTemplate(DEFAULT_NAME,DEFAULT_SOURCE,DEFAULT_CATEGORY,DEFAULT_IMAGE);
        return webTemplate;
    }

    @Before
    public void initTest() {
        webTemplateRepository.deleteAll();
        webTemplate = createEntity();
    }

    @Test
    public void createWebTemplate() throws Exception {
        int databaseSizeBeforeCreate = webTemplateRepository.findAll().size();

        // Create the WebTemplate

        restWebTemplateMockMvc.perform(post("/api/web-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(webTemplate)))
            .andExpect(status().isCreated());

        // Validate the WebTemplate in the database
        List<WebTemplate> webTemplateList = webTemplateRepository.findAll();
        assertThat(webTemplateList).hasSize(databaseSizeBeforeCreate + 1);
        WebTemplate testWebTemplate = webTemplateList.get(webTemplateList.size() - 1);
        assertThat(testWebTemplate.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testWebTemplate.getSource()).isEqualTo(DEFAULT_SOURCE);
    }

    @Test
    public void createWebTemplateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = webTemplateRepository.findAll().size();

        // Create the WebTemplate with an existing ID
        WebTemplate existingWebTemplate = new WebTemplate();
        existingWebTemplate.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restWebTemplateMockMvc.perform(post("/api/web-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingWebTemplate)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<WebTemplate> webTemplateList = webTemplateRepository.findAll();
        assertThat(webTemplateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = webTemplateRepository.findAll().size();
        // set the field null
        webTemplate.setName(null);

        // Create the WebTemplate, which fails.

        restWebTemplateMockMvc.perform(post("/api/web-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(webTemplate)))
            .andExpect(status().isBadRequest());

        List<WebTemplate> webTemplateList = webTemplateRepository.findAll();
        assertThat(webTemplateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkSourceIsRequired() throws Exception {
        int databaseSizeBeforeTest = webTemplateRepository.findAll().size();
        // set the field null
        webTemplate.setSource(null);

        // Create the WebTemplate, which fails.

        restWebTemplateMockMvc.perform(post("/api/web-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(webTemplate)))
            .andExpect(status().isBadRequest());

        List<WebTemplate> webTemplateList = webTemplateRepository.findAll();
        assertThat(webTemplateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllWebTemplates() throws Exception {
        // Initialize the database
        webTemplateRepository.save(webTemplate);

        // Get all the webTemplateList
        restWebTemplateMockMvc.perform(get("/api/web-templates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(webTemplate.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].source").value(hasItem(DEFAULT_SOURCE.toString())));
    }

    @Test
    public void getWebTemplate() throws Exception {
        // Initialize the database
        webTemplateRepository.save(webTemplate);

        // Get the webTemplate
        restWebTemplateMockMvc.perform(get("/api/web-templates/{id}", webTemplate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(webTemplate.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.source").value(DEFAULT_SOURCE.toString()));
    }

    @Test
    public void getNonExistingWebTemplate() throws Exception {
        // Get the webTemplate
        restWebTemplateMockMvc.perform(get("/api/web-templates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateWebTemplate() throws Exception {
        // Initialize the database
        webTemplateService.save(webTemplate);

        int databaseSizeBeforeUpdate = webTemplateRepository.findAll().size();

        // Update the webTemplate
        WebTemplate updatedWebTemplate = webTemplateRepository.findOne(webTemplate.getId());
        updatedWebTemplate
                .name(UPDATED_NAME)
                .source(UPDATED_SOURCE);

        restWebTemplateMockMvc.perform(put("/api/web-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWebTemplate)))
            .andExpect(status().isOk());

        // Validate the WebTemplate in the database
        List<WebTemplate> webTemplateList = webTemplateRepository.findAll();
        assertThat(webTemplateList).hasSize(databaseSizeBeforeUpdate);
        WebTemplate testWebTemplate = webTemplateList.get(webTemplateList.size() - 1);
        assertThat(testWebTemplate.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testWebTemplate.getSource()).isEqualTo(UPDATED_SOURCE);
    }

    @Test
    public void updateNonExistingWebTemplate() throws Exception {
        int databaseSizeBeforeUpdate = webTemplateRepository.findAll().size();

        // Create the WebTemplate

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWebTemplateMockMvc.perform(put("/api/web-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(webTemplate)))
            .andExpect(status().isCreated());

        // Validate the WebTemplate in the database
        List<WebTemplate> webTemplateList = webTemplateRepository.findAll();
        assertThat(webTemplateList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteWebTemplate() throws Exception {
        // Initialize the database
        webTemplateService.save(webTemplate);

        int databaseSizeBeforeDelete = webTemplateRepository.findAll().size();

        // Get the webTemplate
        restWebTemplateMockMvc.perform(delete("/api/web-templates/{id}", webTemplate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WebTemplate> webTemplateList = webTemplateRepository.findAll();
        assertThat(webTemplateList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
