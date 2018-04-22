package com.gsite.app.web.rest;

import com.gsite.app.domain.Feedback;
import com.gsite.app.service.FeedbackService;
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
public class MyFeedbackResource {

    private final Logger log = LoggerFactory.getLogger(MyFeedbackResource.class);

    @Inject
    private FeedbackService feedbackService;

    @GetMapping("/myfeedbacks")
    @Timed
    public ResponseEntity<List<Feedback>> getAllFeedbacks(@ApiParam String userId)
        throws URISyntaxException {
        log.debug("REST request to get a page of Feedbacks with user: {}",userId);
        List<Feedback> list = feedbackService.findAllByUser(userId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    @PostMapping("/myfeedbacks")
    @Timed
    public ResponseEntity<Feedback> createFeedback(@Valid @RequestBody Feedback feedback) throws URISyntaxException {
        log.debug("REST request to save Feedback : {}", feedback);
        if (feedback.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("feedback", "idexists", "A new feedback cannot already have an ID")).body(null);
        }
        Feedback result = feedbackService.save(feedback);
        return ResponseEntity.created(new URI("/api/feedbacks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("feedback", result.getId().toString()))
            .body(result);
    }
}
