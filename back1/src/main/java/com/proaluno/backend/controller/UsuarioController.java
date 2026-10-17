package com.proaluno.backend.controller;

import com.proaluno.backend.dto.UsuarioDTO;
import com.proaluno.backend.model.Usuario;
import com.proaluno.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // Converte Entity -> DTO (nunca expõe senha)
    private UsuarioDTO toDTO(Usuario u) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(u.getId());
        dto.setName(u.getNomeExibido());
        dto.setEmail(u.getEmail());
        dto.setRole(capitalize(u.getTipoUsuario()));
        dto.setIdentifier(u.getIdentificador());
        dto.setStatus(Boolean.TRUE.equals(u.getAtivo()) ? "Ativo" : "Inativo");
        return dto;
    }

    private String capitalize(String s) {
        if (s == null || s.isEmpty()) return s;
        return s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase();
    }

    // 1. GET: Listar todos os usuários (sem senha)
    @GetMapping
    public List<UsuarioDTO> listarUsuarios() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // 2. POST: Cadastrar novo usuário
    @PostMapping
    public ResponseEntity<UsuarioDTO> criarUsuario(@RequestBody UsuarioCreateRequest req) {
        Usuario usuario = new Usuario();
        usuario.setNomeExibido(req.getName());
        usuario.setEmail(req.getEmail());
        usuario.setNomeUsuario(req.getEmail());
        usuario.setTipoUsuario(req.getRole() != null ? req.getRole().toLowerCase() : "aluno");
        usuario.setIdentificador(req.getIdentifier());
        usuario.setAtivo("Inativo".equalsIgnoreCase(req.getStatus()) ? false : true);

        String senha = (req.getPassword() == null || req.getPassword().isEmpty())
                ? "senha123"
                : req.getPassword();
        usuario.setSenhaHash(encoder.encode(senha));

        Usuario salvo = usuarioRepository.save(usuario);
        return ResponseEntity.ok(toDTO(salvo));
    }

    // 3. PUT: Atualizar usuário existente
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> atualizarUsuario(@PathVariable Integer id, @RequestBody UsuarioCreateRequest req) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            if (req.getName() != null) usuario.setNomeExibido(req.getName());
            if (req.getEmail() != null) usuario.setEmail(req.getEmail());
            if (req.getRole() != null) usuario.setTipoUsuario(req.getRole().toLowerCase());
            if (req.getIdentifier() != null) usuario.setIdentificador(req.getIdentifier());
            if (req.getStatus() != null) usuario.setAtivo("Ativo".equalsIgnoreCase(req.getStatus()));

            // Só atualiza senha se o front enviar uma nova
            if (req.getPassword() != null && !req.getPassword().isEmpty()) {
                usuario.setSenhaHash(encoder.encode(req.getPassword()));
            }

            Usuario atualizado = usuarioRepository.save(usuario);
            return ResponseEntity.ok(toDTO(atualizado));
        }

        return ResponseEntity.notFound().build();
    }

    // 4. DELETE: Excluir usuário
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirUsuario(@PathVariable Integer id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // DTO interno para receber dados do front (inclui password, que não existe no UsuarioDTO de resposta)
    public static class UsuarioCreateRequest {
        private String name;
        private String email;
        private String password;
        private String role;
        private String identifier;
        private String status;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getIdentifier() { return identifier; }
        public void setIdentifier(String identifier) { this.identifier = identifier; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}
