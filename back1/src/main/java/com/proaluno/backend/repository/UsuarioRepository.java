package com.proaluno.backend.repository;

import com.proaluno.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    // Método útil para buscar usuário pelo e-mail (bom para login ou validações)
    Optional<Usuario> findByEmail(String email);

    // Método útil para buscar pelo nome de usuário
    Optional<Usuario> findByNomeUsuario(String nomeUsuario);
}