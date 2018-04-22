package com.ainguyen.app.web.rest;

import com.ainguyen.app.service.MailService;
import com.codahale.metrics.annotation.Timed;
import io.swagger.annotations.ApiParam;
import org.apache.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import javax.inject.Inject;
import java.util.Locale;

/**
 * Created by youngkaka on 12/26/16.
 */
@RestController
@RequestMapping("/api")
public class MailResource {

    private final Logger log = LoggerFactory.getLogger(MailResource.class);

    @Inject
    private MailService websiteService;

    @GetMapping("/mail/share")
    @Timed
    public @ResponseBody Boolean shareWebsite(@ApiParam  String from_name, @ApiParam String to_name, @ApiParam String lang, @ApiParam String to_email, @ApiParam String web_id){
        websiteService.sendShareInvitation(from_name,to_name,lang,to_email,web_id);
        return true;
    }
}
