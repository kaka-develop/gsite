package com.ainguyen.app.service;

import com.ainguyen.app.domain.SocialUserConnection;
import com.ainguyen.app.domain.User;
import com.ainguyen.app.repository.SocialUserConnectionRepository;
import com.ainguyen.app.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
        log.debug("Get social user of current user id: {}",id);
        Optional<SocialUserConnection> optionalUser = userConnectionRepository.findOneByUserId(id);
        SocialUserConnection user = null;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
        }
        return user;
    }
}
