package com.ainguyen.app.web.rest;

import com.ainguyen.app.domain.WebTemplate;
import com.ainguyen.app.service.WebTemplateService;
import com.ainguyen.app.service.WebsiteService;
import com.codahale.metrics.annotation.Timed;
import com.ainguyen.app.domain.Website;

import com.ainguyen.app.repository.WebsiteRepository;
import com.ainguyen.app.web.rest.util.HeaderUtil;

import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
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

/**
 * REST controller for managing Website.
 */
@RestController
@RequestMapping("/api")
public class WebsiteResource {

    private final Logger log = LoggerFactory.getLogger(WebsiteResource.class);

    @Inject
    private WebsiteService websiteService;

    @Inject
    private WebTemplateService webTemplateService;

    /**
     * POST  /websites : Create a new website.
     *
     * @param website the website to create
     * @return the ResponseEntity with status 201 (Created) and with body the new website, or with status 400 (Bad Request) if the website has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/websites")
    @Timed
    public ResponseEntity<Website> createWebsite(@Valid @RequestBody Website website) throws URISyntaxException {
        log.debug("REST request to save Website : {}", website);
        if (website.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("website", "idexists", "A new website cannot already have an ID")).body(null);
        }
        if(websiteService.findOneByDomain(website.getDomain()) != null){
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("website", "idexists", "A new website domain is already existed!")).body(website);
        }
        Website result = websiteService.save(website);
        return ResponseEntity.created(new URI("/api/websites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("website", result.getId().toString()))
            .body(result);
    }


    /**
     * PUT  /websites : Updates an existing website.
     *
     * @param website the website to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated website,
     * or with status 400 (Bad Request) if the website is not valid,
     * or with status 500 (Internal Server Error) if the website couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/websites")
    @Timed
    public ResponseEntity<Website> updateWebsite(@Valid @RequestBody Website website) throws URISyntaxException {
        log.debug("REST request to update Website : {}", website);
        if (website.getId() == null) {
            return createWebsite(website);
        }
        Website result = websiteService.save(website);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("website", website.getId().toString()))
            .body(result);
    }

    /**
     * GET  /websites : get all the websites.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of websites in body
     */
    @GetMapping("/websites")
    @Timed
    public List<Website> getAllWebsites() {
        log.debug("REST request to get all Websites");
        List<Website> websites = websiteService.findAll();
        return websites;
    }

    /**
     * GET  /websites/:id : get the "id" website.
     *
     * @param id the id of the website to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the website, or with status 404 (Not Found)
     */
    @GetMapping("/websites/{id}")
    @Timed
    public ResponseEntity<Website> getWebsite(@PathVariable String id) {
        log.debug("REST request to get Website : {}", id);
        Website website = websiteService.findOne(id);
        return Optional.ofNullable(website)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    /**
     * DELETE  /websites/:id : delete the "id" website.
     *
     * @param id the id of the website to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/websites/{id}")
    @Timed
    public ResponseEntity<Void> deleteWebsite(@PathVariable String id) {
        log.debug("REST request to delete Website : {}", id);
        websiteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("website", id.toString())).build();
    }

    @GetMapping("/websites/domain")
    @Timed
    public ResponseEntity<Website> getWebsiteByDomain(@ApiParam String domain) {
        log.debug("REST request to get Website with domain : {}", domain);
        Website website = websiteService.findOneByDomain(domain);
        return Optional.ofNullable(website)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
