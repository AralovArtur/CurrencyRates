package com.artur.CurrencyRates.repository;

import com.artur.CurrencyRates.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Long> {
    List<History> findByUserId(Long id);
}
