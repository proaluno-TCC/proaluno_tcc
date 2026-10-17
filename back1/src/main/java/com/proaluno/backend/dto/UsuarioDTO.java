package com.proaluno.backend.dto;

import lombok.Data;

@Data
public class UsuarioDTO {
    private Integer id;
    private String name;       // Correspondente ao nome do front
    private String email;
    private String role;       // Aluno, Colaborador, Administrador
    private String identifier; // RM ou MAT
    private String status;     // Ativo ou Inativo
}