package com.proaluno.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome_exibido", nullable = false, length = 100)
    private String nomeExibido;

    @Column(name = "nome_usuario", nullable = false, unique = true, length = 50)
    private String nomeUsuario;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "senha_hash", nullable = false, length = 255)
    private String senhaHash;

    @Column(length = 20)
    private String telefone;

    @Column(name = "foto_url", length = 255)
    private String fotoUrl;

    @Column(name = "tipo_usuario", nullable = false, length = 20)
    private String tipoUsuario; // 'aluno', 'colaborador', 'administrador'

    @Column(name = "autenticacao_2fa", nullable = false)
    private Boolean autenticacao2fa = false;

    @Column(name = "criado_em", nullable = false, updatable = false)
    private LocalDateTime criadoEm = LocalDateTime.now();

    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(length = 30)
    private String identificador; 
    
    @PrePersist
    public void prePersist() {
        if (this.nomeUsuario == null || this.nomeUsuario.isEmpty()) {
            this.nomeUsuario = this.email;
        }
        if (this.senhaHash == null || this.senhaHash.isEmpty()) {
            this.senhaHash = "$2a$10$ExemploDeHashTemporarioParaSenhaPadrao123";
        }
    }
    // RM ou MAT (conforme o ALTER TABLE)
}