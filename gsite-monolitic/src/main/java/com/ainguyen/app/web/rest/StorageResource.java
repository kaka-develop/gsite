package com.ainguyen.app.web.rest;

import com.ainguyen.app.service.StorageService;
import com.codahale.metrics.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.inject.Inject;


@RestController
@RequestMapping("/api")
public class StorageResource {
    private final Logger log = LoggerFactory.getLogger(StorageResource.class);

    @Inject
    private StorageService storageService;

    @PostMapping("/storage/image/upload")
    @Timed
    @ResponseBody
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file) {
        if (storageService.uploadFile(file))
            return new ResponseEntity<>(HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
