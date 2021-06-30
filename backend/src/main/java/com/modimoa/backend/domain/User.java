package com.modimoa.backend.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class User implements Serializable {

    public static final long serialVersionUID = -6184044926029805156L;

    @Id //primary key
    @Column(name="user_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="user_email")
    private String userEmail;

    @Column(name="user_image")
    private String userImage;

    @OneToMany(mappedBy = "user")
    private List<Mybag> mybags = new ArrayList<>();


    protected User(){}

    public User(String userEmail, String userImage){
        this.userEmail = userEmail;
        this.userImage = userImage;
    }

    @Override
    public String toString(){
        return String.format("User[user_id=%d, user_email='%s', user_image='%s']", id, userEmail, userImage);
    }
}
