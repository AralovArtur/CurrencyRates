package com.artur.CurrencyRates.repository;

import com.artur.CurrencyRates.entity.CurrencyRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CurrencyRateRepository extends JpaRepository<CurrencyRate, Long> {

    //CurrencyRate findByCurrency();
    Optional<CurrencyRate> findByCurrencyAndLocalDate(String currency, LocalDate localDate);
    Optional<CurrencyRate> findByCurrency(String currency);


}
