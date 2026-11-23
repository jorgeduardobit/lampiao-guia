package com.lampiaoguia.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lampiaoguia.backend.dto.LoginDTO;
import com.lampiaoguia.backend.model.Usuario;
import com.lampiaoguia.backend.service.UsuarioService;

@RestController 
@RequestMapping("/auth")
public class AuthController {

    private final UsuarioService service;

    public AuthController(UsuarioService service) {
        this.service = service;
    }
    
    @PostMapping("/login")
    public Usuario login(@RequestBody LoginDTO dados) {
        return service.autenticar(dados.email(), dados.senha());
    }
}
