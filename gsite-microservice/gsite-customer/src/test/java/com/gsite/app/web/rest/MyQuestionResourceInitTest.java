package com.gsite.app.web.rest;

import com.gsite.app.GsiteCustomerApp;
import com.gsite.app.domain.Question;
import com.gsite.app.repository.QuestionRepository;
import com.gsite.app.service.QuestionService;
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
public class MyQuestionResourceInitTest {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";

    private static final String DEFAULT_ANSWER = "AAAAAAAAAA";

    private static final ZonedDateTime DEFAULT_CREATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);

    private static final String DEFAULT_USER_ID = "AAAAAAAAAA";

    @Inject
    private QuestionRepository questionRepository;

    @Inject
    private QuestionService questionService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    private MockMvc restQuestionMockMvc;

    private Question question;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        MyQuestionResource myQuestionResource = new MyQuestionResource();
        ReflectionTestUtils.setField(myQuestionResource, "questionService", questionService);
        this.restQuestionMockMvc = MockMvcBuilders.standaloneSetup(myQuestionResource)
            .setMessageConverters(jacksonMessageConverter).build();
    }


    public static Question createEntity() {
        Question question = new Question()
            .content(DEFAULT_CONTENT)
            .answer(DEFAULT_ANSWER)
            .created(DEFAULT_CREATED)
            .user_id(DEFAULT_USER_ID);
        return question;
    }

    @Before
    public void initTest() {
        questionRepository.deleteAll();
        question = createEntity();
    }

    @Test
    public void getMyQuestions() throws Exception {
        questionRepository.save(question);

        restQuestionMockMvc.perform(get("/api/myquestions").param("userId", DEFAULT_USER_ID))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(question.getId())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].answer").value(hasItem(DEFAULT_ANSWER.toString())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(sameInstant(DEFAULT_CREATED))))
            .andExpect(jsonPath("$.[*].user_id").value(hasItem(DEFAULT_USER_ID.toString())));
    }


    @Test
    public void createQuestion() throws Exception {
        int databaseSizeBeforeCreate = questionRepository.findAll().size();


        restQuestionMockMvc.perform(post("/api/myquestions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(question)))
            .andExpect(status().isCreated());

        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeCreate + 1);
        Question testQuestion = questionList.get(questionList.size() - 1);
        assertThat(testQuestion.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testQuestion.getAnswer()).isEqualTo(DEFAULT_ANSWER);
        assertThat(testQuestion.getCreated()).isEqualTo(DEFAULT_CREATED);
        assertThat(testQuestion.getUser_id()).isEqualTo(DEFAULT_USER_ID);
    }

}
