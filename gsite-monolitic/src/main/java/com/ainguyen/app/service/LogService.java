package com.ainguyen.app.service;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.LoggerContext;
import com.ainguyen.app.web.rest.vm.LoggerVM;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LogService {

    private final Logger log = LoggerFactory.getLogger(QuestionService.class);

    public List<LoggerVM> getList() {
        log.debug("request to get all logs");
        LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
        return context.getLoggerList()
            .stream()
            .map(LoggerVM::new)
            .collect(Collectors.toList());
    }

    public boolean changeLevel(LoggerVM jsonLogger) {
        log.debug("request to change log level : {}",jsonLogger.getLevel());
        LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
        context.getLogger(jsonLogger.getName()).setLevel(Level.valueOf(jsonLogger.getLevel()));
        return true;
    }
}
