package com.artur.CurrencyRates.entity;

import com.artur.CurrencyRates.service.UserPrincipal;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity(name="history")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String currencyFrom;
    private String currencyTo;
    @Column(name = "time_uploaded")
    private LocalDate localDate;
    @OneToOne
    private User user;

    public History(String currencyFrom, String currencyTo, LocalDate localDate, User user) {
        this.currencyFrom = currencyFrom;
        this.currencyTo = currencyTo;
        this.localDate = localDate;
        this.user = user;
    }
}
