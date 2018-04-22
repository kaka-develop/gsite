package com.gsite.app.service;

import com.gsite.app.domain.SocialUserConnection;
import com.gsite.app.repository.SocialUserConnectionRepository;
import com.gsite.app.security.SecurityUtils;
import com.gsite.app.service.util.ServiceConstants;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.Optional;

@Service
public class SocialUserService {

    private final Logger log = LoggerFactory.getLogger(SocialUserService.class);

    @Inject
    private SocialUserConnectionRepository userConnectionRepository;

    public SocialUserConnection getCurrentSocialUser() {
        String id = SecurityUtils.getCurrentUserLogin();
        log.debug("Get social user of current user id: {}", id);
        Optional<SocialUserConnection> optionalUser = userConnectionRepository.findOneByUserId(id);
        SocialUserConnection user = null;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
        }
        return user;
    }

    public SocialUserConnection fallBackSingle() {
        return null;
    }
}
