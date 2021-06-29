package com.modimoa.backend.domain;

//import com.modimoa.backend.domain.BaseTimeEntity;

import lombok.Builder;

import lombok.Getter;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.io.Serializable;

@Getter
@NoArgsConstructor
@Entity
public class User implements Serializable {

    @Id //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long user_id;

    @Column(nullable = false)
    private String user_name;

    @Column(nullable = false)
    private String user_email;

    @Column
    private String user_image;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;


    @Builder
    public User(String user_name,String user_email, String user_image,Role role){
        this.user_name=user_name;
        this.user_email = user_email;
        this.user_image = user_image;
        this.role=role;
    }

    public User update(String user_name, String user_image){
        this.user_name = user_name;
        this.user_image = user_image;

        return this;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }

    @Override
    public String toString(){
        return String.format("User[user_id=%d, user_email='%s', user_image='%s']", user_id, user_email, user_image);
    }
}
