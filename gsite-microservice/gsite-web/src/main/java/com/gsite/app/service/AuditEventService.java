package com.gsite.app.service;

import com.gsite.app.config.audit.AuditEventConverter;
import com.gsite.app.domain.PersistentAuditEvent;
import com.gsite.app.repository.PersistenceAuditEventRepository;
import java.time.LocalDateTime;

import com.gsite.app.service.util.ServiceConstants;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class AuditEventService extends AbstractService<PersistentAuditEvent> {

    private final PersistenceAuditEventRepository persistenceAuditEventRepository;

    private final AuditEventConverter auditEventConverter;

    public AuditEventService(
        PersistenceAuditEventRepository persistenceAuditEventRepository,
        AuditEventConverter auditEventConverter) {

        this.persistenceAuditEventRepository = persistenceAuditEventRepository;
        this.auditEventConverter = auditEventConverter;
    }

    @HystrixCommand(fallbackMethod = ServiceConstants.FALL_BACK_LIST)
    public Page<AuditEvent> findAll(Pageable pageable) {
        return persistenceAuditEventRepository.findAll(pageable)
            .map(auditEventConverter::convertToAuditEvent);
    }

    @HystrixCommand(fallbackMethod = ServiceConstants.FALL_BACK_LIST)
    public Page<AuditEvent> findByDates(LocalDateTime fromDate, LocalDateTime toDate, Pageable pageable) {
        return persistenceAuditEventRepository.findAllByAuditEventDateBetween(fromDate, toDate, pageable)
            .map(auditEventConverter::convertToAuditEvent);
    }

    public Optional<AuditEvent> find(String id) {
        return Optional.ofNullable(persistenceAuditEventRepository.findOne(id)).map
            (auditEventConverter::convertToAuditEvent);
    }

    public Page<AuditEvent>  fallBackList(Pageable pageable) {
        return new PageImpl<>(new ArrayList<>());
    }

    public Page<AuditEvent>  fallBackList(LocalDateTime fromDate, LocalDateTime toDate, Pageable pageable) {
        return new PageImpl<>(new ArrayList<>());
    }

    public Optional<AuditEvent> fallBackSingle(String param) {
        return Optional.empty();
    }

}
