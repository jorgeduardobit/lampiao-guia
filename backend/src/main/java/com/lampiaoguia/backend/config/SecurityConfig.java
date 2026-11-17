package com.lampiaoguia.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

//TEMPORARIO. Libera todas as rotas para testes. Substituir pela
//configuracao real (login, perfis comum/admin) antes da entrega.

@Configuration
public class SecurityConfig {
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
		.authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
		return http.build();
	}
}