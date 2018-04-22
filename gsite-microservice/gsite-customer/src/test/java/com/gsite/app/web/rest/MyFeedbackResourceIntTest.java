package com.gsite.app.web.rest;

import com.gsite.app.GsiteCustomerApp;
import com.gsite.app.domain.Feedback;
import com.gsite.app.repository.FeedbackRepository;
import com.gsite.app.service.FeedbackService;
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
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = GsiteCustomerApp.class)
public class MyFeedbackResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";

    private static final ZonedDateTime DEFAULT_CREATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);

    private static final String DEFAULT_USER_ID = "AAAAAAAAAA";

    @Inject
    private FeedbackRepository feedbackRepository;

    @Inject
    private FeedbackService feedbackService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    private MockMvc restFeedbackMockMvc;

    private Feedback feedback;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        MyFeedbackResource myFeedbackResource = new MyFeedbackResource();
        ReflectionTestUtils.setField(myFeedbackResource, "feedbackService", feedbackService);
        this.restFeedbackMockMvc = MockMvcBuilders.standaloneSetup(myFeedbackResource)
            .setMessageConverters(jacksonMessageConverter).build();
    }


    public static Feedback createEntity() {
        Feedback feedback = new Feedback()
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT)
            .created(DEFAULT_CREATED)
            .user_id(DEFAULT_USER_ID);
        return feedback;
    }

    @Before
    public void initTest() {
        feedbackRepository.deleteAll();
        feedback = createEntity();
    }

    @Test
    public void getMyFeedbacks() throws Exception {
        feedbackRepository.save(feedback);

        restFeedbackMockMvc.perform(get("/api/myfeedbacks").param("userId", DEFAULT_USER_ID))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(feedback.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(sameInstant(DEFAULT_CREATED))))
            .andExpect(jsonPath("$.[*].user_id").value(hasItem(DEFAULT_USER_ID.toString())));
    }


    @Test
    public void createFeedback() throws Exception {
        int databaseSizeBeforeCreate = feedbackRepository.findAll().size();

        restFeedbackMockMvc.perform(post("/api/myfeedbacks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(feedback)))
            .andExpect(status().isCreated());

        List<Feedback> feedbackList = feedbackRepository.findAll();
        assertThat(feedbackList).hasSize(databaseSizeBeforeCreate + 1);
        Feedback testFeedback = feedbackList.get(feedbackList.size() - 1);
        assertThat(testFeedback.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testFeedback.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testFeedback.getCreated()).isEqualTo(DEFAULT_CREATED);
        assertThat(testFeedback.getUser_id()).isEqualTo(DEFAULT_USER_ID);
    }

}
