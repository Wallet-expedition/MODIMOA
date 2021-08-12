package com.modimoa.backend.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@Entity
@Getter
public class User extends BaseTimeEntity{


    public static final long serialVersionUID = -6184044926029805156L;

    @Id //primary key
    @Column(name="user_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="user_email")
    private String userEmail;

    @Column(name="user_image")
    private String userImage;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Mybag> mybags = new ArrayList<>();

    @Column(name = "oauth_token")
    private String oauthToken;

    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "refresh_token")
    private String refreshToken;



    @Builder
    public User(String userEmail, String userImage,String  oauthToken,String accessToken,String refreshToken){
        this.userEmail = userEmail;
        this.userImage = userImage;
        this.oauthToken=  oauthToken;
        this.accessToken=accessToken;
        this.refreshToken=refreshToken;
    }

    public void updateTokens(String accessToken, String refreshToken){

        this.accessToken=accessToken;
        this.refreshToken=refreshToken;

    }

    @Override
    public String toString(){

        return String.format("User[user_id=%d, user_email='%s', user_image='%s',oauth_token = '%s',access_token ='%s'," +
                "refresh_token ='%s']", id, userEmail, userImage,oauthToken,accessToken,refreshToken);

    }
}
