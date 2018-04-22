package com.gsite.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.gsite.app.domain.Notification;
import com.gsite.app.service.NotificationService;
import com.gsite.app.web.rest.util.HeaderUtil;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MyNotificationResource {

    private final Logger log = LoggerFactory.getLogger(MyNotificationResource.class);


    private final NotificationService notificationService;

    public MyNotificationResource(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/mynotifications")
    @Timed
    public ResponseEntity<List<Notification>> getAllNotificationsByUserEmail(@ApiParam String userEmail)
        throws URISyntaxException {
        log.debug("REST request to get a page of Notifications by user: {}" ,userEmail);
        List<Notification> list = notificationService.findAllBySentUser(userEmail);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @DeleteMapping("/mynotifications")
    @Timed
    public ResponseEntity<String> deleteNotification( @ApiParam String id, @ApiParam String userEmail) {
        log.debug("REST request to delete Notification : {}", id);
        notificationService.deleteUser(id,userEmail);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("notification", id.toString())).build();
    }

}
