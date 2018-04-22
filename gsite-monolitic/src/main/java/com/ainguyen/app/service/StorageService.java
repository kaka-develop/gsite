package com.ainguyen.app.service;

import com.ainguyen.app.config.JHipsterProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.inject.Inject;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;

@Service
public class StorageService {

    private final Logger log = LoggerFactory.getLogger(StorageService.class);

    @Inject
    Environment environment;

    @Async
    public boolean uploadFile(MultipartFile file) {
        try {
            // Get the filename and build the local file path
            String filename = file.getOriginalFilename();
            String directory = environment.getProperty("storage.url.image");
            String filepath = Paths.get(directory, filename).toString();

            // Save the file locally
            BufferedOutputStream stream =
                new BufferedOutputStream(new FileOutputStream(new File(filepath)));
            stream.write(file.getBytes());
            stream.close();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }
}
