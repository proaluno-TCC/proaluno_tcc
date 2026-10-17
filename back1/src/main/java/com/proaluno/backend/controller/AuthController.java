package com.proaluno.backend.controller;

import com.proaluno.backend.dto.LoginRequest;
import com.proaluno.backend.model.Usuario;
import com.proaluno.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(req.getEmail());

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Email ou senha inválidos");
        }

        Usuario usuario = usuarioOpt.get();

        if (!Boolean.TRUE.equals(usuario.getAtivo())) {
            return ResponseEntity.status(403).body("Usuário inativo");
        }

        boolean senhaCorreta = encoder.matches(req.getPassword(), usuario.getSenhaHash());

        if (!senhaCorreta) {
            return ResponseEntity.status(401).body("Email ou senha inválidos");
        }

        return ResponseEntity.ok(new LoginResponse(
                usuario.getId(),
                usuario.getNomeExibido(),
                usuario.getEmail(),
                usuario.getTipoUsuario(),
                usuario.getIdentificador(),
                Boolean.TRUE.equals(usuario.getAtivo())
        ));
    }

    public static class LoginResponse {
        public Integer id;
        public String name;
        public String email;
        public String role;
        public String identifier;
        public String status;

        public LoginResponse(Integer id, String name, String email, String role, String identifier, boolean ativo) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.role = role;
            this.identifier = identifier;
            this.status = ativo ? "Ativo" : "Inativo";
        }
    }
}
