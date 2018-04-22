package com.ainguyen.app.web.rest;

import com.ainguyen.app.GsiteApp;

import com.ainguyen.app.domain.Website;
import com.ainguyen.app.repository.WebsiteRepository;

import com.ainguyen.app.service.WebsiteService;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.ainguyen.app.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WebsiteResource REST controller.
 *
 * @see WebsiteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GsiteApp.class)
public class WebsiteResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_USER_ID = "AAAAAAAAAA";
    private static final String UPDATED_USER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_TEMPLATE_ID = "AAAAAAAAAA";
    private static final String UPDATED_TEMPLATE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_DOMAIN = "AAAAAAAAAA";
    private static final String UPDATED_DOMAIN = "BBBBBBBBBB";

    @Inject
    private WebsiteRepository websiteRepository;

    @Inject
    private WebsiteService websiteService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restWebsiteMockMvc;

    private Website website;



    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        WebsiteResource websiteResource = new WebsiteResource();
        ReflectionTestUtils.setField(websiteResource, "websiteService", websiteService);
        this.restWebsiteMockMvc = MockMvcBuilders.standaloneSetup(websiteResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Website createEntity() {
        Website website = new Website()
                .name(DEFAULT_NAME)
                .created(DEFAULT_CREATED)
                .user_id(DEFAULT_USER_ID)
                .template(DEFAULT_TEMPLATE_ID)
                .domain(DEFAULT_DOMAIN);
        return website;
    }

    @Before
    public void initTest() {
        websiteRepository.deleteAll();
        website = createEntity();
    }

    @Test
    public void createWebsite() throws Exception {
        int databaseSizeBeforeCreate = websiteRepository.findAll().size();

        // Create the Website

        restWebsiteMockMvc.perform(post("/api/websites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(website)))
            .andExpect(status().isCreated());

        // Validate the Website in the database
        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeCreate + 1);
        Website testWebsite = websiteList.get(websiteList.size() - 1);
        assertThat(testWebsite.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testWebsite.getCreated()).isEqualTo(DEFAULT_CREATED);
        assertThat(testWebsite.getUser_id()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testWebsite.getTemplate()).isEqualTo(DEFAULT_TEMPLATE_ID);
        assertThat(testWebsite.getDomain()).isEqualTo(DEFAULT_DOMAIN);
    }

    @Test
    public void createWebsiteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = websiteRepository.findAll().size();

        // Create the Website with an existing ID
        Website existingWebsite = new Website();
        existingWebsite.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restWebsiteMockMvc.perform(post("/api/websites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingWebsite)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = websiteRepository.findAll().size();
        // set the field null
        website.setName(null);

        // Create the Website, which fails.

        restWebsiteMockMvc.perform(post("/api/websites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(website)))
            .andExpect(status().isBadRequest());

        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCreatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = websiteRepository.findAll().size();
        // set the field null
        website.setCreated(null);

        // Create the Website, which fails.

        restWebsiteMockMvc.perform(post("/api/websites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(website)))
            .andExpect(status().isBadRequest());

        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkUser_idIsRequired() throws Exception {
        int databaseSizeBeforeTest = websiteRepository.findAll().size();
        // set the field null
        website.setUser_id(null);

        // Create the Website, which fails.

        restWebsiteMockMvc.perform(post("/api/websites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(website)))
            .andExpect(status().isBadRequest());

        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkTemplateIsRequired() throws Exception {
        int databaseSizeBeforeTest = websiteRepository.findAll().size();
        // set the field null
        website.setTemplate(null);

        // Create the Website, which fails.

        restWebsiteMockMvc.perform(post("/api/websites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(website)))
            .andExpect(status().isBadRequest());

        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkDomainIsRequired() throws Exception {
        int databaseSizeBeforeTest = websiteRepository.findAll().size();
        // set the field null
        website.setDomain(null);

        // Create the Website, which fails.

        restWebsiteMockMvc.perform(post("/api/websites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(website)))
            .andExpect(status().isBadRequest());

        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllWebsites() throws Exception {
        // Initialize the database
        websiteRepository.save(website);

        // Get all the websiteList
        restWebsiteMockMvc.perform(get("/api/websites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(website.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(sameInstant(DEFAULT_CREATED))))
            .andExpect(jsonPath("$.[*].user_id").value(hasItem(DEFAULT_USER_ID.toString())))
            .andExpect(jsonPath("$.[*].template").value(hasItem(DEFAULT_TEMPLATE_ID.toString())))
            .andExpect(jsonPath("$.[*].domain").value(hasItem(DEFAULT_DOMAIN.toString())));
    }

    @Test
    public void getWebsite() throws Exception {
        // Initialize the database
        websiteRepository.save(website);

        // Get the website
        restWebsiteMockMvc.perform(get("/api/websites/{id}", website.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(website.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.created").value(sameInstant(DEFAULT_CREATED)))
            .andExpect(jsonPath("$.user_id").value(DEFAULT_USER_ID.toString()))
            .andExpect(jsonPath("$.template").value(DEFAULT_TEMPLATE_ID.toString()))
            .andExpect(jsonPath("$.domain").value(DEFAULT_DOMAIN.toString()));
    }

    @Test
    public void getNonExistingWebsite() throws Exception {
        // Get the website
        restWebsiteMockMvc.perform(get("/api/websites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateWebsite() throws Exception {
        // Initialize the database
        websiteService.save(website);
        int databaseSizeBeforeUpdate = websiteRepository.findAll().size();

        // Update the website
        Website updatedWebsite = websiteRepository.findOne(website.getId());
        updatedWebsite
                .name(UPDATED_NAME)
                .created(UPDATED_CREATED)
                .user_id(UPDATED_USER_ID)
                .template(UPDATED_TEMPLATE_ID)
                .domain(UPDATED_DOMAIN);

        restWebsiteMockMvc.perform(put("/api/websites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWebsite)))
            .andExpect(status().isOk());

        // Validate the Website in the database
        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeUpdate);
        Website testWebsite = websiteList.get(websiteList.size() - 1);
        assertThat(testWebsite.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testWebsite.getCreated()).isEqualTo(UPDATED_CREATED);
        assertThat(testWebsite.getUser_id()).isEqualTo(UPDATED_USER_ID);
        assertThat(testWebsite.getTemplate()).isEqualTo(UPDATED_TEMPLATE_ID);
        assertThat(testWebsite.getDomain()).isEqualTo(UPDATED_DOMAIN);
    }

    @Test
    public void updateNonExistingWebsite() throws Exception {
        int databaseSizeBeforeUpdate = websiteRepository.findAll().size();

        // Create the Website

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWebsiteMockMvc.perform(put("/api/websites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(website)))
            .andExpect(status().isCreated());

        // Validate the Website in the database
        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteWebsite() throws Exception {
        // Initialize the database
        websiteService.save(website);
        int databaseSizeBeforeDelete = websiteRepository.findAll().size();

        // Get the website
        restWebsiteMockMvc.perform(delete("/api/websites/{id}", website.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Website> websiteList = websiteRepository.findAll();
        assertThat(websiteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
