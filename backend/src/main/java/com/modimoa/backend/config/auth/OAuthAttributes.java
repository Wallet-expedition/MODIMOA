package com.modimoa.backend.config.auth;

import com.modimoa.backend.domain.User;
import lombok.Builder;
import lombok.Getter;

import javax.management.relation.Role;
import java.util.Map;

@Getter
public class OAuthAttributes {
    private Map<String , Object> attributes;
    private String nameAttributeKey;
    private String user_name;
    private String user_email;
    private String user_image;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes,
                           String nameAttributeKey, String user_name,
                           String user_email, String user_image) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.user_name = user_name;
        this.user_email = user_email;
        this.user_image=user_image;
    }

    public static OAuthAttributes of(String registrationId,String userNameAttributeName,
                                     Map<String, Object> attributes){
        if("naver".equals(registrationId)){
            return ofNaver("id",attributes);
        }
        return ofGoogle(userNameAttributeName,attributes);
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .user_name((String) attributes.get("user_name"))
                .user_email((String) attributes.get("user_email"))
                .user_image((String) attributes.get("user_image"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofNaver(String userNameaattributeName, Map<String, Object>attributes){
        Map<String,Object> response =(Map<String, Object>) attributes.get("response");

        return OAuthAttributes.builder()
                .user_name((String) response.get("user_name"))
                .user_email((String) response.get("user_email"))
                .user_image((String) response.get("user_image"))
                .attributes(attributes)
                .nameAttributeKey(userNameaattributeName)
                .build();

    }



    public User toEntity(){
        return User.builder()
                .user_name(user_name)
                .user_email(user_email)
                .user_image(user_image)
                .build();
    }

}
