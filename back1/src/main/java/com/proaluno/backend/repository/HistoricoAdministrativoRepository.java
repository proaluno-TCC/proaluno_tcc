package com.proaluno.backend.repository;

import com.proaluno.backend.model.HistoricoAdministrativo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoricoAdministrativoRepository extends JpaRepository<HistoricoAdministrativo, Integer> {

    // Lista o histórico de ações feitas por um administrador específico
    List<HistoricoAdministrativo> findByAdministradorId(Integer administradorId);
}