package com.proaluno.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "historico_administrativo")
public class HistoricoAdministrativo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Relacionamento com o usuário administrador que realizou a ação
    @ManyToOne
    @JoinColumn(name = "administrador_id", nullable = false)
    private Usuario administrador;

    // Relacionamento opcional com o usuário que sofreu a ação (pode ser nulo)
    @ManyToOne
    @JoinColumn(name = "usuario_afetado_id", nullable = true)
    private Usuario usuarioAfetado;

    @Column(nullable = false, length = 30)
    private String acao; // 'cadastrar_usuario', 'alterar_usuario', 'desativar_usuario', 'excluir_usuario'

    @Column(length = 255)
    private String descricao;

    @Column(name = "data_acao", nullable = false, updatable = false)
    private LocalDateTime dataAcao = LocalDateTime.now();
}