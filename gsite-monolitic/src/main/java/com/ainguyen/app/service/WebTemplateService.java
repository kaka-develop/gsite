package com.ainguyen.app.service;

import com.ainguyen.app.domain.WebTemplate;
import com.ainguyen.app.repository.WebTemplateRepository;
import com.ainguyen.app.service.util.SortUntil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

@Service
public class WebTemplateService {

    private final Logger log = LoggerFactory.getLogger(WebTemplateService.class);

    @Inject
    private WebTemplateRepository webTemplateRepository;

    @Inject
    private WebsiteService websiteService;

    public WebTemplate save(WebTemplate webTemplate) {
        log.debug("Request to save WebTemplate : {}", webTemplate);
        WebTemplate result = webTemplateRepository.save(webTemplate);
        return result;
    }


    public List<WebTemplate> findAll() {
        log.debug("Request to get all WebTemplates");
        List<WebTemplate> result = webTemplateRepository.findAll(SortUntil.CREATED_SORT);
        return result;
    }


    public WebTemplate findOne(String id) {
        log.debug("Request to get WebTemplate : {}", id);
        WebTemplate webTemplate = webTemplateRepository.findOne(id);
        return webTemplate;
    }

    public WebTemplate findOneBySource(String source) {
        log.debug("Request to get WebTemplate source: {}", source);
        WebTemplate webTemplate = webTemplateRepository.findOneBySource(source);
        return webTemplate;
    }

    public boolean delete(String id) {
        log.debug("Request to delete WebTemplate : {}", id);
        WebTemplate webTemplate = webTemplateRepository.findOne(id);
        if (webTemplate != null)
            if (isDeleted(webTemplate.getSource())) {
                webTemplateRepository.delete(id);
                return true;
            }
        return false;
    }

    private boolean isDeleted(String source) {
        if (!websiteService.findAllByTemplateSource(source).isEmpty())
            return false;
        return true;
    }

    public Page<WebTemplate> search(String query, String field, Pageable pageable) {
        log.debug("Request to search WebTemplates with query: {} on {}", query, field);
        return webTemplateRepository.search(query, field, pageable);
    }
}
