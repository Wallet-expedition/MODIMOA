package com.modimoa.backend.config.auth.dto;

import com.modimoa.backend.domain.User;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {
    private String user_name;
    private  String user_email;
    private  String user_image;

    public SessionUser (User user){
        this.user_name= user.getUser_name();
        this.user_email=user.getUser_email();
        this.user_image=user.getUser_image();
    }

}
