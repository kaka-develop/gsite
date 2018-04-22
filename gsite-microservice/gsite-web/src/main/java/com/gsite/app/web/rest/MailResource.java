package com.gsite.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.gsite.app.service.MailService;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

@RestController
@RequestMapping("/api")
public class MailResource {

    private final Logger log = LoggerFactory.getLogger(MailResource.class);

    @Inject
    private MailService websiteService;

    @GetMapping("/mail/share")
    @Timed
    public @ResponseBody
    Boolean shareWebsite(@ApiParam String from_name, @ApiParam String to_name, @ApiParam String lang, @ApiParam String to_email, @ApiParam String web_id) {
        websiteService.sendShareInvitation(from_name, to_name, lang, to_email, web_id);
        return true;
    }
}
