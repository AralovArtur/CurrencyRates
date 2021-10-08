package com.artur.CurrencyRates.entity.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseCurrencyDto {
    private String currencyFrom;
    private String currencyTo;
}
