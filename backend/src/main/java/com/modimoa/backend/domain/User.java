package com.modimoa.backend.domain;

//import com.modimoa.backend.domain.BaseTimeEntity;

import lombok.Builder;

import lombok.Getter;


import javax.persistence.*;
import java.io.Serializable;

@Getter
@Entity
public class User implements Serializable {

    public static final long serialVersionUID = -6184044926029805156L;

    @Id //primary key
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long user_id;

    @Column(name="user_email")
    private String user_email;

    @Column(name="user_image")
    private String user_image;


    protected User(){}

    @Builder
    public User(String user_email, String user_image){
        this.user_email = user_email;
        this.user_image = user_image;
    }

    public User update(String user_email, String user_image){
        this.user_email = user_email;
        this.user_image = user_image;

        return this;
    }

    @Override
    public String toString(){
        return String.format("User[user_id=%d, user_email='%s', user_image='%s']", user_id, user_email, user_image);
    }
}
