package com.gsite.app.web.rest;

import com.gsite.app.domain.Question;
import com.gsite.app.service.QuestionService;
import com.codahale.metrics.annotation.Timed;
import com.gsite.app.web.rest.util.HeaderUtil;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MyQuestionResource {

    private final Logger log = LoggerFactory.getLogger(MyQuestionResource.class);

    @Inject
    private QuestionService questionService;

    @GetMapping("/myquestions")
    @Timed
    public ResponseEntity<List<Question>> getAllQuestionsByUser(@ApiParam String userId)
        throws URISyntaxException {
        log.debug("REST request to get all question of user: {}",userId);
        List<Question> list = questionService.findAllByUser(userId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    @PostMapping("/myquestions")
    @Timed
    public ResponseEntity<Question> createQuestion(@Valid @RequestBody Question question) throws URISyntaxException {
        log.debug("REST request to save Question : {}", question);
        if (question.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("question", "idexists", "A new question cannot already have an ID")).body(null);
        }
        Question result = questionService.save(question);
        return ResponseEntity.created(new URI("/api/questions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("question", result.getId().toString()))
            .body(result);
    }
}
