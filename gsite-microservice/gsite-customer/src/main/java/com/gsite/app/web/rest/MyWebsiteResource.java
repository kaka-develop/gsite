package com.gsite.app.web.rest;

import com.gsite.app.domain.WebTemplate;
import com.gsite.app.domain.Website;
import com.gsite.app.service.WebTemplateService;
import com.gsite.app.service.WebsiteService;
import com.gsite.app.web.rest.util.HeaderUtil;
import com.codahale.metrics.annotation.Timed;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class MyWebsiteResource {
    private final Logger log = LoggerFactory.getLogger(MyWebsiteResource.class);

    @Inject
    private WebsiteService websiteService;

    @Inject
    private WebTemplateService templateService;

    @GetMapping("/mywebsites")
    @Timed
    public List<Website> getMyWebsites(@ApiParam String user_id) {
        log.debug("REST request to get user's websites with user_id: " + user_id);
        List<Website> websites = websiteService.findAllPaidByUserID(user_id);
        return websites;
    }

    @GetMapping("/mywebsites/unpaid")
    @Timed
    public List<Website> getMyUnpaidWebsites(@ApiParam String user_id) {
        log.debug("REST request to get user's unpaid websites with user_id: " + user_id);
        List<Website> websites = websiteService.findAllUnpaidByUserID(user_id);
        return websites;
    }

    @GetMapping("/mywebsites/{id}")
    @Timed
    public ResponseEntity<Website> getWebsite(@PathVariable String id) {
        log.debug("REST request to get user's id Website : {}", id);
        Website website = websiteService.findOne(id);
        return Optional.ofNullable(website)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/mywebsites/share")
    @Timed
    public List<Website> getMySharedWebsites(@ApiParam String user_email) {
        log.debug("REST request to get shared websites with user_email: " + user_email);
        List<Website> websites = websiteService.findAllSharedByUserEmail(user_email);
        return websites;
    }

    @PostMapping("/mywebsites/create")
    @Timed
    public ResponseEntity<Website> createMyWebsite(@Valid @RequestBody Website website) throws URISyntaxException {

        if(websiteService.findOneByDomain(website.getDomain()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(website);
        }
        if (!isTemplateFree(website.getTemplate())) {
            Website result = websiteService.save(website);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        }
        website.setPaid(true);
        Website result = websiteService.save(website);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/mywebsites/update")
    @Timed
    public ResponseEntity<Website> updateMyWebsite(@Valid @RequestBody Website website) throws URISyntaxException {
        Website result = websiteService.save(website);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("website", website.getId().toString()))
            .body(result);
    }

    @PostMapping("/mywebsites/paid")
    @Timed
    public ResponseEntity<Website> payMyWebsite(@RequestParam String id) throws URISyntaxException {
        Website website = websiteService.findOne(id);
        website.setPaid(true);
        websiteService.save(website);
        return ResponseEntity.status(HttpStatus.OK).body(website);
    }

    private boolean isTemplateFree(String source) {
        WebTemplate template = templateService.findOneBySource(source);
        if (template != null)
            return template.getPrice().equals(BigDecimal.ZERO);
        else
            return true;
    }

    @DeleteMapping("/mywebsites/delete")
    @Timed
    public ResponseEntity<Website> deleteWebsite(@ApiParam String id) {
        log.debug("REST request to delete Website : {}", id);
        websiteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("website", id.toString())).build();
    }


}
