package com.ainguyen.app.web.rest;

import com.ainguyen.app.service.LogService;
import com.ainguyen.app.web.rest.vm.LoggerVM;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.LoggerContext;
import com.codahale.metrics.annotation.Timed;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/management")
public class LogsResource {

    @Inject
    private LogService logService;

    @GetMapping("/logs")
    @Timed
    public List<LoggerVM> getList() {
       return logService.getList();
    }

    @PutMapping("/logs")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Timed
    public void changeLevel(@RequestBody LoggerVM jsonLogger) {
        logService.changeLevel(jsonLogger);
    }
}
