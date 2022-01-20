package com.modimoa.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(CorsRegistry registry){
		registry.addMapping("/**")
				.allowedOrigins("https://modimoa.kro.kr", "http://110.34.75.163:3000", "http://localhost:3000", "http://127.0.0.1:3000/")
				.allowedMethods("POST", "GET", "PUT", "OPTIONS", "DELETE", "HEAD")
				.allowedHeaders("*")
				.exposedHeaders("Set-Cookie")
				.allowCredentials(true);
	}
}
