package com.artur.CurrencyRates.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity(name="currency_rate")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CurrencyRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String currency;
    private double rate;
    @Column(name = "time_uploaded")
    private LocalDate localDate;

    public CurrencyRate(String currency, double rate, LocalDate localDate) {
        this.currency = currency;
        this.rate = rate;
        this.localDate = localDate;
    }

}
