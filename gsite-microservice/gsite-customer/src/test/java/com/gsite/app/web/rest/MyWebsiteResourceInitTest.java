package com.gsite.app.web.rest;

import com.gsite.app.GsiteCustomerApp;
import com.gsite.app.domain.Website;
import com.gsite.app.repository.WebsiteRepository;
import com.gsite.app.service.WebTemplateService;
import com.gsite.app.service.WebsiteService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.inject.Inject;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;

import static com.gsite.app.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = GsiteCustomerApp.class)
public class MyWebsiteResourceInitTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String DEFAULT_TEMPLATE_ID = "AAAAAAAAAA";

    private static final ZonedDateTime DEFAULT_CREATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);

    private static final String DEFAULT_DOMAIN = "AAAAAAAAAA";
    private static final String DEFAULT_USER_ID = "AAAAAAAAAA";

    @Inject
    private WebsiteRepository websiteRepository;

    @Inject
    private WebsiteService websiteService;

    @Inject
    private WebTemplateService templateService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    private MockMvc restWebsiteMockMvc;

    private Website website;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        MyWebsiteResource myWebsiteResource = new MyWebsiteResource();
        ReflectionTestUtils.setField(myWebsiteResource, "websiteService", websiteService);
        ReflectionTestUtils.setField(myWebsiteResource, "templateService", templateService);
        this.restWebsiteMockMvc = MockMvcBuilders.standaloneSetup(myWebsiteResource)
            .setMessageConverters(jacksonMessageConverter).build();
    }


    public static Website createEntity() {
        Website website = new Website()
            .name(DEFAULT_NAME)
            .created(DEFAULT_CREATED)
            .user_id(DEFAULT_USER_ID)
            .template(DEFAULT_TEMPLATE_ID)
            .domain(DEFAULT_DOMAIN);
        website.setPaid(true);
        return website;
    }

    @Before
    public void initTest() {
        websiteRepository.deleteAll();
        website = createEntity();
    }

    @Test
    public void getMyWebsites() throws Exception {
        websiteRepository.save(website);

        restWebsiteMockMvc.perform(get("/api/mywebsites").param("user_id", DEFAULT_USER_ID))
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
        websiteRepository.save(website);

        restWebsiteMockMvc.perform(get("/api/mywebsites/{id}", website.getId()))
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
    public void getMyUnpaidWebsites() throws Exception {
        website.setPaid(false);
        websiteRepository.save(website);

        restWebsiteMockMvc.perform(get("/api/mywebsites/unpaid").param("user_id", DEFAULT_USER_ID))
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
    public void getMySharedWebsites() throws Exception {
        website.getSharedUsers().add(DEFAULT_USER_ID);
        websiteRepository.save(website);

        restWebsiteMockMvc.perform(get("/api/mywebsites/share").param("user_email", DEFAULT_USER_ID))
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
    public void createWebsite() throws Exception {
        int databaseSizeBeforeCreate = websiteRepository.findAll().size();


        restWebsiteMockMvc.perform(post("/api/mywebsites/create")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(website)))
            .andExpect(status().isOk());

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
    public void testPayAWebsite() throws Exception {
        websiteRepository.save(website);

        restWebsiteMockMvc.perform(post("/api/mywebsites/paid").param("id", website.getId()))
            .andExpect(status().isOk());
    }

}
