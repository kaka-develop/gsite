package com.gsite.app.service.dto;

import com.gsite.app.domain.SocialUserConnection;

import javax.validation.constraints.Size;

public class SocialUserDTO {

    @Size(max = 255)
    private String displayName;

    @Size(max = 255)
    private String imageURL;

    public SocialUserDTO(SocialUserConnection user) {
        this.displayName = user.getDisplayName();
        this.imageURL = user.getImageURL();
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }
}
